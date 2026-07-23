import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Disc, SkipForward, Upload, Image as ImageIcon, Video as VideoIcon, Trash2, X, Check, Volume2, VolumeX } from "lucide-react";
import { saveMediaBlob, getMediaBlob, deleteMediaBlob } from "../lib/mediaStorage";

interface StartCoverProps {
  onTap: () => void;
}

const CUSTOM_IMAGE_DB_KEY = "amu_gacha_cover_image";
const CUSTOM_VIDEO_DB_KEY = "amu_gacha_cover_video";

export const StartCover: React.FC<StartCoverProps> = ({ onTap }) => {
  // 画像・動画のフォールバック用パス配列（サーバーpublic内、GitHub Pages互換のため相対パス）
  const videoCandidates = [
    "./cover-video.mp4",
    "./cover-video.mp4.MP4",
    "./cover-video.MP4",
    "./cover-video.mov",
    "./cover-video.MOV",
    "./cover-video.webm",
    "./cover-video.m4v"
  ];
  const imageCandidates = [
    "./cover.PNG",
    "./cover.png",
    "./cover.jpg",
    "./cover.jpg.PNG",
    "./cover.jpeg",
    "./cover.JPG",
    "./cover.webp"
  ];

  const [videoIndex, setVideoIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  // カスタムアップロード画像・動画のURL (Blob URL)
  const [customImageSrc, setCustomImageSrc] = useState<string | null>(null);
  const [customVideoSrc, setCustomVideoSrc] = useState<string | null>(null);

  const [phase, setPhase] = useState<"image" | "video">("image");
  const [hasVideo, setHasVideo] = useState<boolean>(true);
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);
  const [hasCustomImg, setHasCustomImg] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // 設定パネルの開閉
  const [showUploader, setShowUploader] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const mainVideoRef = useRef<HTMLVideoElement>(null);

  // 初回読み込みで IndexedDB に保存された画像・動画を取得
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const imgBlob = await getMediaBlob(CUSTOM_IMAGE_DB_KEY);
        if (imgBlob && active) {
          const url = URL.createObjectURL(imgBlob);
          setCustomImageSrc(url);
          setImgLoaded(true);
          setHasCustomImg(true);
        }

        const vidBlob = await getMediaBlob(CUSTOM_VIDEO_DB_KEY);
        if (vidBlob && active) {
          const url = URL.createObjectURL(vidBlob);
          setCustomVideoSrc(url);
          setHasVideo(true);
        }
      } catch (e) {
        console.warn("Media IndexedDB load error:", e);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  // 画像ファイル選択処理
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      await saveMediaBlob(CUSTOM_IMAGE_DB_KEY, file);
      if (customImageSrc) URL.revokeObjectURL(customImageSrc);
      const url = URL.createObjectURL(file);
      setCustomImageSrc(url);
      setImgLoaded(true);
      setHasCustomImg(true);
    } catch (err) {
      console.error("Image save error:", err);
      alert("画像の保存に失敗しました。");
    } finally {
      setIsUploading(false);
    }
  };

  // 動画ファイル選択処理
  const handleVideoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      await saveMediaBlob(CUSTOM_VIDEO_DB_KEY, file);
      if (customVideoSrc) URL.revokeObjectURL(customVideoSrc);
      const url = URL.createObjectURL(file);
      setCustomVideoSrc(url);
      setHasVideo(true);
    } catch (err) {
      console.error("Video save error:", err);
      alert("動画の保存に失敗しました。");
    } finally {
      setIsUploading(false);
    }
  };

  // メディア削除
  const clearCustomMedia = async () => {
    if (customImageSrc) URL.revokeObjectURL(customImageSrc);
    if (customVideoSrc) URL.revokeObjectURL(customVideoSrc);
    setCustomImageSrc(null);
    setCustomVideoSrc(null);
    await deleteMediaBlob(CUSTOM_IMAGE_DB_KEY);
    await deleteMediaBlob(CUSTOM_VIDEO_DB_KEY);
  };

  // 画面全体タップ時の処理
  const handleContainerClick = (e: React.MouseEvent) => {
    // アップローダー操作中やボタンクリック時はタップ進行させない
    if ((e.target as HTMLElement).closest(".prevent-tap-advance")) {
      return;
    }

    if (phase === "image") {
      // 最初は画像表示中。タップされたら動画があれば動画フェーズへ、無ければ直接メイン画面へ
      if (customVideoSrc || hasVideo) {
        setPhase("video");
      } else {
        onTap();
      }
    } else {
      // 動画再生中にタップされたらスキップしてメイン画面へ
      onTap();
    }
  };

  return (
    <div
      onClick={handleContainerClick}
      className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-between select-none cursor-pointer overflow-hidden group"
    >
      {/* 隠しファイルインプット */}
      <input
        type="file"
        ref={imageInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleImageFileChange}
      />
      <input
        type="file"
        ref={videoInputRef}
        accept="video/*"
        className="hidden"
        onChange={handleVideoFileChange}
      />

      {/* 右上：メディア設定ボタン */}
      <div className="absolute top-4 right-4 z-50 prevent-tap-advance">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowUploader(!showUploader);
          }}
          className="flex items-center gap-1.5 bg-slate-900/90 border border-purple-500/60 hover:bg-slate-800 text-purple-200 text-xs font-bold px-3 py-2 rounded-full shadow-lg backdrop-blur-md transition-all active:scale-95 cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5 text-pink-400" />
          <span>画像・動画を設定</span>
        </button>

        {/* 設定ポップアップ */}
        {showUploader && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 mt-2 w-72 bg-slate-900/95 border border-purple-500/50 rounded-2xl p-4 shadow-2xl backdrop-blur-xl text-white space-y-3 prevent-tap-advance"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-black text-purple-300">オープニングメディア設定</span>
              <button
                type="button"
                onClick={() => setShowUploader(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-slate-300 leading-relaxed">
              スマホやPCからお好きな画像・動画を直接選択して背景に設定できます。
            </p>

            {/* 設定状態ステータス */}
            <div className="bg-slate-950/80 rounded-xl p-2.5 border border-slate-800 space-y-1 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1">
                  <ImageIcon className="w-3.5 h-3.5 text-purple-400" />
                  静止画像:
                </span>
                {customImageSrc ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> 設定済み
                  </span>
                ) : (
                  <span className="text-slate-500">未設定 (/cover.jpg)</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1">
                  <VideoIcon className="w-3.5 h-3.5 text-pink-400" />
                  オープニング動画:
                </span>
                {customVideoSrc ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> 設定済み
                  </span>
                ) : (
                  <span className="text-slate-500">未設定 (/cover-video.mp4)</span>
                )}
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                disabled={isUploading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 active:scale-95 text-white font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer shadow-md disabled:opacity-50"
              >
                <ImageIcon className="w-4 h-4 text-pink-300" />
                <span>{customImageSrc ? "① 静止画像を変更する" : "① 静止画像を選択"}</span>
              </button>

              <button
                type="button"
                onClick={() => videoInputRef.current?.click()}
                disabled={isUploading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 to-rose-600 hover:opacity-90 active:scale-95 text-white font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer shadow-md disabled:opacity-50"
              >
                <VideoIcon className="w-4 h-4 text-yellow-200" />
                <span>{customVideoSrc ? "② オープニング動画を変更する" : "② オープニング動画を選択"}</span>
              </button>

              {/* 動画再生テスト */}
              {customVideoSrc && (
                <button
                  type="button"
                  onClick={() => {
                    setPhase("video");
                    setShowUploader(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-pink-300 font-bold text-xs py-2 rounded-xl border border-pink-500/40 transition-all cursor-pointer"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                  <span>動画の再生テストを行う</span>
                </button>
              )}

              {(customImageSrc || customVideoSrc) && (
                <button
                  type="button"
                  onClick={clearCustomMedia}
                  className="w-full flex items-center justify-center gap-1.5 text-red-400 hover:text-red-300 font-bold text-[11px] pt-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>設定した画像をクリア・初期化</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 1. 動画再生フェーズ (phase === "video") */}
      {phase === "video" && (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-slate-950 overflow-hidden">
          {/* 背景の薄いブラー効果（動画を拡大背景にして雰囲気を演出） */}
          <video
            src={customVideoSrc || videoCandidates[videoIndex]}
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-20 blur-xl pointer-events-none scale-110"
          />

          {/* 9:16 アスペクト比メイン動画フレーム */}
          <div className="relative w-full h-full max-w-[calc(100vh*9/16)] aspect-[9/16] max-h-full flex items-center justify-center overflow-hidden shadow-2xl bg-black">
            <video
              ref={mainVideoRef}
              src={customVideoSrc || videoCandidates[videoIndex]}
              autoPlay
              muted={isMuted}
              playsInline
              preload="auto"
              onEnded={onTap} // 動画が終わったら自動でメイン画面へ
              onError={(e) => {
                console.warn("Video load error:", e);
                if (!customVideoSrc) {
                  if (videoIndex + 1 < videoCandidates.length) {
                    setVideoIndex(videoIndex + 1);
                  } else {
                    setHasVideo(false);
                    onTap();
                  }
                }
              }}
              className="w-full h-full object-cover"
            />
            {/* 動画上のグラデーション */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />
          </div>

          {/* 音声切替 & スキップ案内バナー */}
          <div className="absolute bottom-10 left-6 right-6 z-40 flex items-center justify-between prevent-tap-advance">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsMuted(!isMuted);
              }}
              className="flex items-center gap-2 bg-slate-900/90 border border-pink-500/60 backdrop-blur-md px-4 py-2.5 rounded-full text-xs font-black text-white shadow-2xl hover:bg-slate-800 transition-all cursor-pointer"
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-red-400" />
                  <span>ミュート中 (タップでサウンドON)</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-400 animate-bounce" />
                  <span>サウンド再生中</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-2 bg-slate-900/90 border border-purple-500/60 backdrop-blur-md px-4 py-2.5 rounded-full text-xs font-black text-white shadow-2xl animate-pulse">
              <span>タップでスキップ</span>
              <SkipForward className="w-4 h-4 text-pink-400" />
            </div>
          </div>
        </div>
      )}

      {/* 2. 画像フェーズ (phase === "image") */}
      {phase === "image" && (
        <>
          {/* カスタム画像またはサーバー画像 */}
          {(customImageSrc || hasCustomImg) && (
            <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-slate-950 overflow-hidden">
              {/* 背景ブラー演出 */}
              <img
                src={customImageSrc || imageCandidates[imageIndex]}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-20 blur-xl pointer-events-none scale-110"
              />

              {/* 9:16 アスペクト比メイン画像フレーム */}
              <div className="relative w-full h-full max-w-[calc(100vh*9/16)] aspect-[9/16] max-h-full flex items-center justify-center overflow-hidden shadow-2xl bg-black">
                <img
                  src={customImageSrc || imageCandidates[imageIndex]}
                  alt="AMU GACHA Cover"
                  onLoad={() => setImgLoaded(true)}
                  onError={() => {
                    if (!customImageSrc) {
                      if (imageIndex + 1 < imageCandidates.length) {
                        setImageIndex(imageIndex + 1);
                      } else {
                        setHasCustomImg(false);
                      }
                    }
                  }}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${
                    imgLoaded || customImageSrc ? "opacity-100" : "opacity-0"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/60 pointer-events-none" />
              </div>
            </div>
          )}

          {/* カスタム画像がない場合のデフォルトネオンイラスト */}
          {!customImageSrc && (!hasCustomImg || !imgLoaded) && (
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center overflow-hidden">
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-purple-600/30 via-blue-500/20 to-pink-500/30 rounded-full blur-[130px] animate-pulse" />
              <div className="w-full h-full bg-[radial-gradient(#c084fc_1px,transparent_1px)] [background-size:28px_28px] opacity-20" />

              <div className="relative w-72 h-80 sm:w-80 sm:h-96 my-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600 via-blue-500 to-pink-500 animate-spin [animation-duration:10s] opacity-60 blur-2xl" />

                <div className="relative w-full h-full rounded-3xl bg-slate-900/90 border-2 border-purple-500/50 backdrop-blur-2xl flex flex-col items-center justify-between p-6 shadow-2xl overflow-hidden">
                  <div className="text-center space-y-1">
                    <p className="text-2xl font-black bg-gradient-to-r from-purple-400 via-blue-300 to-pink-400 bg-clip-text text-transparent tracking-widest">
                      AMU GACHA
                    </p>
                    <p className="text-[10px] text-purple-300 font-bold tracking-widest">
                      作詞、作曲プロンプトガチャ
                    </p>
                  </div>

                  <div className="relative w-full h-40 rounded-2xl bg-gradient-to-b from-white/10 via-purple-500/10 to-blue-500/10 border border-white/20 flex items-center justify-center overflow-hidden">
                    <div className="flex gap-2 animate-bounce">
                      <span className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-pink-400 shadow-lg shadow-purple-500/50 block border border-white/30" />
                      <span className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-300 shadow-lg shadow-blue-500/50 block border border-white/30" />
                      <span className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 to-pink-500 shadow-lg shadow-pink-500/50 block border border-white/30" />
                      <span className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-400 to-blue-500 shadow-lg shadow-emerald-500/50 block border border-white/30" />
                    </div>
                  </div>

                  <div className="w-16 h-16 rounded-full bg-slate-800 border-4 border-purple-500 flex items-center justify-center shadow-lg">
                    <Disc className="w-8 h-8 text-pink-400 animate-spin [animation-duration:5s]" />
                  </div>
                </div>

                <div className="absolute top-4 -left-6 bg-slate-900/90 border border-purple-500/50 backdrop-blur-md px-3 py-1.5 rounded-xl text-[11px] font-bold text-purple-300 shadow-xl">
                  Lyric 歌詞
                </div>
                <div className="absolute top-4 -right-6 bg-slate-900/90 border border-blue-500/50 backdrop-blur-md px-3 py-1.5 rounded-xl text-[11px] font-bold text-blue-300 shadow-xl">
                  Melody 曲調
                </div>
                <div className="absolute bottom-20 -left-6 bg-slate-900/90 border border-pink-500/50 backdrop-blur-md px-3 py-1.5 rounded-xl text-[11px] font-bold text-pink-300 shadow-xl">
                  Theme テーマ
                </div>
                <div className="absolute bottom-20 -right-6 bg-slate-900/90 border border-cyan-500/50 backdrop-blur-md px-3 py-1.5 rounded-xl text-[11px] font-bold text-cyan-300 shadow-xl">
                  Style スタイル
                </div>
              </div>
            </div>
          )}

          {/* 上部タイトルロゴ (AMU GACHA) */}
          <div className="relative z-20 top-6 left-0 right-0 text-center px-4">
            <div className="inline-flex items-center gap-2 bg-slate-950/80 border border-purple-500/50 backdrop-blur-md rounded-full px-5 py-1.5 text-xs font-black shadow-2xl">
              <Sparkles className="w-4 h-4 text-pink-400 animate-spin [animation-duration:3s]" />
              <span className="bg-gradient-to-r from-purple-300 via-blue-200 to-pink-300 bg-clip-text text-transparent tracking-wider">
                作詞、作曲プロンプトガチャ
              </span>
            </div>
          </div>

          {/* 画面中央：点滅する「タップしてスタート 👆」ボタン */}
          <div className="relative z-30 my-auto flex flex-col items-center justify-center px-4">
            <div className="p-[2.5px] rounded-full bg-gradient-to-r from-purple-500 via-blue-400 via-pink-500 to-purple-500 shadow-[0_0_40px_rgba(236,72,153,0.8)] animate-pulse hover:scale-105 transition-transform duration-300">
              <div className="bg-slate-950/90 backdrop-blur-md rounded-full px-8 py-4 sm:px-10 sm:py-5 flex items-center justify-center gap-3 border border-white/20">
                <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-purple-200 via-white to-pink-200 bg-clip-text text-transparent tracking-widest drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                  タップしてスタート 👆
                </span>
              </div>
            </div>
          </div>

          {/* フッター指示 */}
          <div className="relative z-20 pb-8 text-center px-4">
            <p className="text-xs text-white/90 font-bold tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] animate-bounce">
              画面をタップするとオープニング動画が再生されます
            </p>
          </div>
        </>
      )}
    </div>
  );
};


