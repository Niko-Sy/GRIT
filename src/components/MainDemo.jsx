import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Midi } from '@tonejs/midi';
import * as Tone from 'tone';
import midiFile from '../assets/demo.mid?url';

// 音轨颜色配置
const TRACK_COLORS = [
	'#2563eb', // blue
	'#0ea5e9', // cyan
	'#22c55e', // green
	'#f59e0b', // amber
	'#ef4444', // red
	'#8b5cf6', // purple
	'#ec4899', // pink
	'#14b8a6', // teal
];

// 动态 Piano Roll 组件
const DynamicPianoRoll = ({ midiData, currentTime, duration }) => {
	const svgRef = useRef(null);
	const [viewBox, setViewBox] = useState({ width: 800, height: 440 });
	
	// 计算可视化参数
	const noteHeight = 6; // 每个音符的高度
	const trackCount = midiData?.trackCount || 3;
	const trackPadding = 8; // 轨道间距
	const trackHeight = (viewBox.height - (trackCount + 1) * trackPadding) / trackCount;
	
	// 计算当前视图的时间窗口（显示前后各4秒）
	const windowDuration = 8;
	const windowStart = Math.max(0, currentTime - windowDuration / 2);
	const windowEnd = windowStart + windowDuration;
	
	// 获取每个轨道的音符范围
	const getTrackNoteRange = (trackIndex) => {
		if (!midiData || !midiData.notes) return { min: 60, max: 72 };
		const trackNotes = midiData.notes.filter(n => n.track === trackIndex);
		if (trackNotes.length === 0) return { min: 60, max: 72 };
		const mins = trackNotes.map(n => n.midi);
		const maxs = trackNotes.map(n => n.midi);
		return {
			min: Math.min(...mins) - 2,
			max: Math.max(...maxs) + 2
		};
	};
	
	// 轨道名称
	const trackNames = ['Track 1', 'Track 2', 'Track 3', 'Track 4', 'Track 5', 'Track 6', 'Track 7', 'Track 8'];
	
	if (!midiData || !midiData.notes || midiData.notes.length === 0) {
		return (
			<svg
				ref={svgRef}
				viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
				className="w-full h-[26rem]"
				role="img"
				aria-label="MIDI piano roll"
			>
				<rect x="0" y="0" width={viewBox.width} height={viewBox.height} rx="16" fill="#f8fafc" />
				<text x={viewBox.width / 2} y={viewBox.height / 2} textAnchor="middle" fill="#94a3b8" fontSize="14">
					Loading MIDI data...
				</text>
			</svg>
		);
	}

	return (
		<svg
			ref={svgRef}
			viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
			className="w-full h-[26rem]"
			role="img"
			aria-label="MIDI piano roll"
			style={{ overflow: 'hidden' }}
		>
			<defs>
				<linearGradient id="rollGrad" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="#0f172a" />
					<stop offset="100%" stopColor="#2563eb" />
				</linearGradient>
				<clipPath id="pianoRollClip">
					<rect x="0" y="0" width={viewBox.width} height={viewBox.height} rx="16" />
				</clipPath>
			</defs>
			
			{/* 背景 */}
			<rect x="0" y="0" width={viewBox.width} height={viewBox.height} rx="16" fill="#f8fafc" />
			
			<g clipPath="url(#pianoRollClip)">
				{/* 渲染每个轨道 */}
				{Array.from({ length: trackCount }).map((_, trackIndex) => {
					const trackY = trackPadding + trackIndex * (trackHeight + trackPadding);
					const noteRange = getTrackNoteRange(trackIndex);
					const range = noteRange.max - noteRange.min + 1;
					const trackColor = TRACK_COLORS[trackIndex % TRACK_COLORS.length];
					const trackBgColor = `${trackColor}08`; // 非常淡的背景色
					
					return (
						<g key={`track-${trackIndex}`}>
							{/* 轨道背景 */}
							<rect
								x="0"
								y={trackY}
								width={viewBox.width}
								height={trackHeight}
								fill={trackBgColor}
								rx="8"
							/>
							
							{/* 轨道边框 */}
							<rect
								x="0"
								y={trackY}
								width={viewBox.width}
								height={trackHeight}
								fill="none"
								stroke={trackColor}
								strokeWidth="1"
								strokeOpacity="0.2"
								rx="8"
							/>
							
							{/* 轨道标签 */}
							<text
								x="12"
								y={trackY + 18}
								fill={trackColor}
								fontSize="11"
								fontWeight="600"
								opacity="0.8"
							>
								{trackNames[trackIndex]}
							</text>
							
							{/* 网格线 - 垂直线（时间） */}
							{Array.from({ length: 9 }).map((_, i) => {
								const x = (i / 8) * viewBox.width;
								return (
									<line
										key={`v-${trackIndex}-${i}`}
										x1={x}
										y1={trackY}
										x2={x}
										y2={trackY + trackHeight}
										stroke="#e2e8f0"
										strokeWidth={i % 2 === 0 ? "1" : "0.5"}
										opacity={i % 2 === 0 ? 0.6 : 0.3}
									/>
								);
							})}
							
							{/* 网格线 - 水平线（音高，每个八度一条） */}
							{Array.from({ length: Math.ceil(range / 12) + 1 }).map((_, i) => {
								const y = trackY + (i / Math.ceil(range / 12)) * trackHeight;
								return (
									<line
										key={`h-${trackIndex}-${i}`}
										x1="0"
										y1={y}
										x2={viewBox.width}
										y2={y}
										stroke="#e2e8f0"
										strokeWidth="0.5"
										opacity="0.4"
									/>
								);
							})}
							
							{/* 渲染该轨道的音符 */}
							{midiData.notes
								.filter(note => note.track === trackIndex)
								.map((note, index) => {
									const noteStart = note.time;
									const noteEnd = note.time + note.duration;
									
									// 只渲染在当前窗口内的音符
									if (noteEnd < windowStart || noteStart > windowEnd) {
										return null;
									}
									
									// 计算X位置（相对于窗口）
									const x = ((noteStart - windowStart) / windowDuration) * viewBox.width;
									const width = Math.max(4, (note.duration / windowDuration) * viewBox.width);
									
									// 计算Y位置（在轨道内的相对位置）
									const noteY = trackY + trackHeight - 8 - ((note.midi - noteRange.min) / range) * (trackHeight - 16);
									
									// 判断是否正在播放
									const isActive = currentTime >= noteStart && currentTime <= noteEnd;
									
									return (
										<rect
											key={`note-${trackIndex}-${index}`}
											x={x}
											y={noteY - noteHeight / 2}
											width={width}
											height={noteHeight}
											rx="2"
											fill={trackColor}
											opacity={isActive ? 1 : 0.75}
											style={{
												filter: isActive ? 'brightness(1.2) drop-shadow(0 0 4px rgba(59, 130, 246, 0.5))' : 'none',
												transition: 'opacity 0.1s, filter 0.1s'
											}}
										/>
									);
								})}
						</g>
					);
				})}
			</g>
		</svg>
	);
};


const MainDemo = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [midiData, setMidiData] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	
	const synthsRef = useRef([]);
	const scheduledEventsRef = useRef([]);
	const startTimeRef = useRef(0);
	const pauseTimeRef = useRef(0);
	const animationRef = useRef(null);
	const midiRef = useRef(null);

	// 加载并解析 MIDI 文件
	useEffect(() => {
		const loadMidi = async () => {
			try {
				const response = await fetch(midiFile);
				const arrayBuffer = await response.arrayBuffer();
				const midi = new Midi(arrayBuffer);
				midiRef.current = midi;
				
				// 提取所有音符
				const allNotes = [];
				let minNote = 127;
				let maxNote = 0;
				
				midi.tracks.forEach((track, trackIndex) => {
					track.notes.forEach((note) => {
						allNotes.push({
							time: note.time,
							duration: note.duration,
							midi: note.midi,
							velocity: note.velocity,
							track: trackIndex,
							name: note.name
						});
						minNote = Math.min(minNote, note.midi);
						maxNote = Math.max(maxNote, note.midi);
					});
				});
				
				// 按时间排序
				allNotes.sort((a, b) => a.time - b.time);
				
				setMidiData({
					notes: allNotes,
					duration: midi.duration,
					minNote: minNote - 2,
					maxNote: maxNote + 2,
					trackCount: midi.tracks.length
				});
				
				setDuration(midi.duration);
				setIsLoaded(true);
				
				console.log(`Loaded MIDI: ${allNotes.length} notes, duration: ${midi.duration}s, tracks: ${midi.tracks.length}`);
			} catch (error) {
				console.error('Failed to load MIDI file:', error);
			}
		};
		
		loadMidi();
		
		// 清理函数
		return () => {
			stopPlayback();
		};
	}, []);

	// 停止播放
	const stopPlayback = useCallback(() => {
		// 取消所有已调度的事件
		scheduledEventsRef.current.forEach(id => Tone.getTransport().clear(id));
		scheduledEventsRef.current = [];
		
		// 停止并释放所有合成器
		synthsRef.current.forEach(synth => {
			if (synth) {
				synth.releaseAll();
			}
		});
		
		Tone.getTransport().stop();
		Tone.getTransport().cancel();
		
		if (animationRef.current) {
			cancelAnimationFrame(animationRef.current);
		}
	}, []);

	// 创建合成器
	const createSynths = useCallback((trackCount) => {
		// 清理旧的合成器
		synthsRef.current.forEach(synth => {
			if (synth) {
				synth.dispose();
			}
		});
		
		// 为每个音轨创建一个 PolySynth
		const newSynths = [];
		for (let i = 0; i < trackCount; i++) {
			const synth = new Tone.PolySynth(Tone.Synth, {
				oscillator: {
					type: 'triangle'
				},
				envelope: {
					attack: 0.02,
					decay: 0.1,
					sustain: 0.3,
					release: 0.8
				}
			}).toDestination();
			synth.volume.value = -12; // 降低音量避免失真
			newSynths.push(synth);
		}
		synthsRef.current = newSynths;
		return newSynths;
	}, []);

	// 调度 MIDI 播放
	const scheduleMidi = useCallback((startOffset = 0) => {
		if (!midiRef.current) return;
		
		const midi = midiRef.current;
		const synths = createSynths(midi.tracks.length);
		
		// 清除之前的调度
		scheduledEventsRef.current.forEach(id => Tone.getTransport().clear(id));
		scheduledEventsRef.current = [];
		
		// 调度每个音轨的音符
		midi.tracks.forEach((track, trackIndex) => {
			const synth = synths[trackIndex];
			if (!synth) return;
			
			track.notes.forEach((note) => {
				// 只调度还未播放的音符
				if (note.time >= startOffset) {
					const eventId = Tone.getTransport().schedule((time) => {
						synth.triggerAttackRelease(
							note.name,
							note.duration,
							time,
							note.velocity
						);
					}, note.time - startOffset);
					scheduledEventsRef.current.push(eventId);
				}
			});
		});
	}, [createSynths]);

	// 更新播放时间（用于动画）
	const updateTime = useCallback(() => {
		if (isPlaying && midiRef.current) {
			const transportTime = Tone.getTransport().seconds;
			const newTime = pauseTimeRef.current + transportTime;
			
			if (newTime >= duration) {
				setCurrentTime(duration);
				setIsPlaying(false);
				stopPlayback();
				setCurrentTime(0);
				pauseTimeRef.current = 0;
			} else {
				setCurrentTime(newTime);
				animationRef.current = requestAnimationFrame(updateTime);
			}
		}
	}, [isPlaying, duration, stopPlayback]);

	useEffect(() => {
		if (isPlaying) {
			// 使用更高频率的更新来保持同步
			const updateLoop = () => {
				if (isPlaying && midiRef.current) {
					const transportTime = Tone.getTransport().seconds;
					const newTime = pauseTimeRef.current + transportTime;
					
					if (newTime >= duration) {
						setCurrentTime(duration);
						setIsPlaying(false);
						stopPlayback();
						setCurrentTime(0);
						pauseTimeRef.current = 0;
					} else {
						setCurrentTime(newTime);
						animationRef.current = requestAnimationFrame(updateLoop);
					}
				}
			};
			animationRef.current = requestAnimationFrame(updateLoop);
		}
		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
				animationRef.current = null;
			}
		};
	}, [isPlaying, duration, stopPlayback]);

	// 播放/暂停切换
	const togglePlay = async () => {
		if (!isLoaded) return;
		
		// 确保 AudioContext 已启动（需要用户交互）
		await Tone.start();
		
		if (isPlaying) {
			// 暂停 - 保存当前位置
			const transportTime = Tone.getTransport().seconds;
			pauseTimeRef.current = pauseTimeRef.current + transportTime;
			stopPlayback();
			setIsPlaying(false);
		} else {
			// 播放
			Tone.getTransport().cancel();
			Tone.getTransport().seconds = 0;
			
			scheduleMidi(pauseTimeRef.current);
			
			Tone.getTransport().start();
			startTimeRef.current = Tone.now();
			setIsPlaying(true);
		}
	};

	// 进度条点击处理
	const handleProgressClick = (e) => {
		const bounds = e.currentTarget.getBoundingClientRect();
		const percent = (e.clientX - bounds.left) / bounds.width;
		const newTime = Math.max(0, Math.min(percent * duration, duration));
		
		const wasPlaying = isPlaying;
		
		// 停止当前播放
		if (wasPlaying) {
			stopPlayback();
			setIsPlaying(false);
		}
		
		// 设置新时间
		pauseTimeRef.current = newTime;
		setCurrentTime(newTime);
		
		// 如果之前正在播放，从新位置继续播放
		if (wasPlaying) {
			setTimeout(async () => {
				await Tone.start();
				Tone.getTransport().cancel();
				Tone.getTransport().seconds = 0;
				scheduleMidi(newTime);
				Tone.getTransport().start();
				startTimeRef.current = Tone.now();
				setIsPlaying(true);
			}, 50);
		}
	};

	const formatTime = (time) => {
		if (isNaN(time)) return '0:00';
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds.toString().padStart(2, '0')}`;
	};

	return (
		<motion.section
			className="max-w-6xl mx-auto px-6 md:px-12 py-4 md:py-6"
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.8 }}
		>
			<motion.h2
				className="text-4xl md:text-5xl font-semibold text-center mb-6 text-gray-900"
				initial={{ opacity: 0, y: -20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
			>
				Main Generation Example
			</motion.h2>
			<motion.p
				className="text-gray-600 text-lg md:text-xl text-center max-w-3xl mx-auto"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
				transition={{ delay: 0.2, duration: 0.6 }}
			>
				This page showcases multi-track symbolic music examples generated by the model, including audio playback, MIDI piano-roll visualization, and staff notation.
			</motion.p>

			<div className="mt-10 flex flex-col gap-8">
				<motion.div
					className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
				>
					<h3 className="text-2xl font-semibold text-gray-900 mb-3">MIDI Generation Demo</h3>
					<p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
						Experience the generated MIDI music with visual piano roll representation and audio playback.
					</p>
					
					{/* Audio Player */}
					<div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 mb-6 border border-gray-100">
						<div className="flex flex-col gap-4">
							<div className="flex items-center gap-4">
								<button
									onClick={togglePlay}
									disabled={!isLoaded}
									className={`flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 flex-shrink-0 border border-gray-200 ${!isLoaded ? 'opacity-50 cursor-not-allowed' : ''}`}
									aria-label={isPlaying ? 'Pause' : 'Play'}
								>
									{isPlaying ? (
										<svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
											<path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
										</svg>
									) : (
										<svg className="w-5 h-5 text-gray-900 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
											<path d="M8 5v14l11-7z" />
										</svg>
									)}
								</button>
								<div className="flex-1">
									<div className="text-sm text-gray-600 mb-2">
										{isLoaded ? 'MIDI Playback (Direct Synthesis)' : 'Loading MIDI...'}
									</div>
									<div className="flex items-center gap-3">
										<span className="text-xs text-gray-500 w-10 text-right">
											{formatTime(currentTime)}
										</span>
										<div 
											className="flex-1 h-2 bg-white rounded-full cursor-pointer shadow-inner relative overflow-hidden"
											onClick={handleProgressClick}
										>
											<div 
												className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-100"
												style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
											/>
										</div>
										<span className="text-xs text-gray-500 w-10">
											{formatTime(duration)}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="bg-gray-50 rounded-2xl p-4">
						<DynamicPianoRoll 
							midiData={midiData} 
							currentTime={currentTime} 
							duration={duration}
						/>
					</div>
				</motion.div>

				{/* <motion.div
					className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					<h3 className="text-2xl font-semibold text-gray-900 mb-3">五线谱展示</h3>
					<p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
						五线谱图像可视化旋律轮廓与节拍信息，便于直观观察生成的音乐结构。
					</p>
					<div className="bg-gray-50 rounded-2xl p-4">
						<StaffGraphic />
					</div>
				</motion.div> */}
			</div>
		</motion.section>
	);
};

export default MainDemo;
