import YouTube from "react-youtube";
export const PlayerComponent = ({ videoId }) => {
  return (
    <YouTube
      videoId={videoId}
      className="reproductor"
      opts={{
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1,
          controls: 0,
          cc_load_policy: 0,
          fs: 0,
          iv_load_policy: 0,
          rel: 0,
          showinfo: 0,
        },
      }}
    />
  );
};
