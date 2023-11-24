export const getKey = (data) => {
    const { videos } = data;
    const { results } = videos;
    const video = results.find((video) =>
        video.name.includes("Official Trailer")
    );
    const key = video !== undefined && video?.key;
    return key;
};