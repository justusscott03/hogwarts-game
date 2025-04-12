/*

MIT License

Copyright (c) 2024 LeaferStudios

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

class Base64AudioPlayer {

    constructor (t) {
        this.audioArray = t;
        this.currentIndex = 0;
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 256;
        this.source = null;
        this.buffer = null;
        this.isPlaying = !1;
        this.startTime = 0;
        this.elapsedTime = 0;
        this.duration = 0;
        this.hasEnded = !1;
        this.isPaused = !1;
        this.autoplay = !1;
        this.loopTrack = !1; 
        this.loadAudio(this.currentIndex);
    }

    _convertBase64ToArrayBuffer (t) {
        for (var e = atob(t.split(",")[1]), i = e.length, a = new Uint8Array(i), n = 0; n < i; n++) {
            a[n] = e.charCodeAt(n);
        }
        
        return a.buffer;
    }

    loadAudio (t) {
        if (t >= 0 && t < this.audioArray.length) {
            var e = this._convertBase64ToArrayBuffer(this.audioArray[t]);
            var i = this;
            this.audioContext.decodeAudioData(e).then(function (buffer) {
                i.buffer = buffer;
                i.duration = buffer.duration;
            }).catch(function (error) {
                throw new Error(`Error decoding audio data: ${error}`)
            });
        } 
        else {
            throw new Error("Index out of bounds");
        }
    }

    selectTrack (t) {
        this.currentIndex = constrain(t, 0, this.audioArray.length);
        this.loadAudio(this.currentIndex);
    }

    togglePlayPause () {
        if (this.hasEnded) {
            this.play();
            this.hasEnded = !1;
        }
        else if (this.isPlaying) {
            this.pause();
        }
        else if (!this.isPlaying && this.buffer) {
            this.play();
        }
    }

    play () {
        if (this.buffer) {
            if (this.source) {
                this.source.stop();
                this.source.disconnect();
            }
            this.source = this.audioContext.createBufferSource();
            this.source.buffer = this.buffer;
            this.source.connect(this.analyser);
            this.analyser.connect(this.audioContext.destination);
            var t = this.elapsedTime > 0 ? this.elapsedTime : 0;
            this.startTime = this.audioContext.currentTime - t;
            this.source.start(0, t);
            this.isPlaying = !0;
            this.hasEnded = !1;
            this.isPaused = !1;
            var e = this;
            this.source.onended = function () {
                if (e.isPaused) {}
                else if (e.loopTrack) {
                    e.source = e.audioContext.createBufferSource();
                    e.source.buffer = e.buffer;
                    e.source.connect(e.analyser);
                    e.analyser.connect(e.audioContext.destination);
                    e.source.start(0);
                } 
                else {
                    e.isPlaying = false;
                    e.elapsedTime = 0;
                    e.hasEnded = true;
                }
            };
        }
    }

    pause () {
        if (this.isPlaying) {
            this.source.stop();
            this.elapsedTime = this.audioContext.currentTime - this.startTime;
            this.isPlaying = false;
            this.isPaused = true;
        }
    }

}

// var audioArray = [];

// var audioPlayer = new Base64AudioPlayer(audioArray);

// audioPlayer.loadAudio(0);

// document.addEventListener("mouseup", function (event) {
//     event.preventDefault();

//     audioPlayer.play();
// });
