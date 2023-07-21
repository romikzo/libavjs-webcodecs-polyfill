importScripts("../worker-util.js");

(async function() {
    await LibAVWebCodecs.load();

    const [[stream], allPackets] =
        await sampleDemux("../sample1.flac", "flac");
    const packets = allPackets[stream.index];

    const init = {
        codec: "flac",
        sampleRate: 48000,
        numberOfChannels: 2,
        description: stream.extradata
    };

    const a = await decodeAudio(
        init, packets, stream, LibAVWebCodecs.AudioDecoder,
        LibAVWebCodecs.EncodedAudioChunk);
    let b = null;
    if (typeof AudioDecoder !== "undefined") {
        try {
            b = await decodeAudio(
                init, packets, stream, AudioDecoder, EncodedAudioChunk);
        } catch (ex) {
            console.error(ex);
        }
    }

    postMessage({a, b});
})();
