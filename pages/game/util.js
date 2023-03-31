export function loadAssets(assets, callback) {
    let loaded = 0, total = assets.length;
    return new Promise((resolve, reject) => {
        let ret = {
            images: {},
            audios: {}
        };
        assets.forEach((item, index) => {
            if(item.type == 'image') {
                let img = new Image();
                img.src = item.path;
                img.addEventListener('load', (e) => {
                    loaded++;
                    ret.images[item.name] = {
                        image: img,
                        width: img.naturalWidth,
                        height: img.naturalHeight
                    };
                    callback(loaded, total)
                    if(loaded >= total) resolve(ret);
                })
            }else if(item.type == 'audio') {
                let audio = new Audio();
                audio.src = item.path;
                audio.addEventListener('canplaythrough', (e) => {
                    loaded++;
                    ret.audios[item.name] = {
                        audio: audio
                    };
                    callback(loaded, total)
                    if(loaded >= total) resolve(ret);
                })
            }
        })
    })
}