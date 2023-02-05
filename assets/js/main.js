const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const musicPlayer = $('.musicSrc')
const playMusicBtn = $('.playMusicBtn')
const musicListTheme = $('.musicListTheme')
const app = {
    isPlaying: true,
    isLoop: false,
    isShuffle: false,
    songs: [
        {
            id: 0,
            name: 'Dạ Vũ',
            singer: 'Tăng Duy Tân',
            path: './music/(BAE) TĂNG DUY TÂN - DẠ VŨ  Official Music Video.mp3',
            image: '/image/Da Vu.jpg',
        },
        {
            id: 1,
            name: 'Ái Nộ',
            singer: 'Masew x Khôi Vũ',
            path: './music/AiNo1-MasewKhoiVu-7078913.mp3',
            image: '/image/Ai No.jpg',
        },
        {
            id: 2,
            name: 'Ánh Sao và Bầu Trời',
            singer: 'Tri x Cá',
            path: './music/Ánh Sao Và Bầu Trời - T.R.I x Cá  [Official Audio].mp3',
            image: '/image/Anh Sao va Bau Troi.jpg',
        },
        {
            id: 3,
            name: 'Hạ Còn Vương Nắng',
            singer: 'Datkaa',
            path: './music/Hạ còn vương nắng remix.mp3',
            image: '/image/Ha Con Vuong Nang.jpg',
        },
        {
            id: 4,
            name: 'Lửng Lơ',
            singer: 'Masew',
            path: './music/LungLoRemix-MasewBRayREDTYTien-8545548.mp3',
            image: '/image/Lung Lo.jpg',
        },
        {
            id: 5,
            name: 'Nhất Thân',
            singer: 'Masew x Khôi Vũ',
            path: './music/NhatThan-MasewKhoiVu-7060342.mp3',
            image: '/image/Nhat Than.jpg',
        },
        {
            id: 6,
            name: 'Không Bằng',
            singer: 'RIN Music Remix',
            path: './music/Nói Với Em Một Lời Trước Khi Xa Rời  Không Bằng (RIN Music Remix) - Na.mp3',
            image: '/image/Khong Bang.jpg',
        },
        {
            id: 7,
            name: 'Tình Đầu',
            singer: 'Tăng Duy Tân',
            path: './music/TÌNH ĐẦU - Tăng Duy Tân  Official Music Video.mp3',
            image: '/image/Tinh Dau.jpg',
        },
        {
            id: 8,
            name: 'Vui Lắm Nha',
            singer: 'Hương Ly x Jombie',
            path: './music/Vui Lắm Nha Remix - Hương Ly, Jombie, Đại Mèo, mình ở bên nhau cuộc đời vui lắm nha Remix hot TIKTOK.mp3',
            image: '/image/Vui Lam Nha.jpg',
        },
    ],
    currentIndex: 0,
    // load bài hát hiện tại
    loadCurrentSong() {
        let currentTheme = $('.currentInfo')
        let currentImage = $('.musicPlayTheme__image')
        let currentIndex = this.currentIndex
        let currentSong = this.songs[currentIndex]
        //load bài hát
        musicPlayer.src = this.songs[currentIndex].path
        musicPlayer.load()

        //Hàm này được gọi mỗi khi metatdata của tài nguyên audio đã được tải xong
        musicPlayer.onloadedmetadata = (e) => {
            // load giao diện
            currentImage.style.backgroundImage = `url('${currentSong.image}')`
            currentTheme.innerHTML = `
            <div class="musicPlayInfo">
            <h3 class="musicName">
                ${currentSong.name}
            </h3>
            <h4 class="musicSinger">
                ${currentSong.singer}
            </h4>
            </div>
            <div class="durationPlaying">
                <div class="durationTime">
                    <span class="currentDuration">0:00</span>
                    <span class="totalDuration">${convertToMinuteAndSecond(musicPlayer.duration)}</span>
                </div>
                <div class="timeLine">
                    <div class="runningTime"></div>
                </div>
            </div>       
            `
            musicPlayer.play()
        }

        // event timeupdate khi bài hát đang chạy
        musicPlayer.ontimeupdate = (e) => {
            const runningBar = $('.timeLine')
            const runningTime = $('.runningTime')
            const currentDuration = $('.currentDuration')
            if (currentDuration) {

                //render thời gian chạy bài hát
                currentDuration.innerHTML = convertToMinuteAndSecond(musicPlayer.currentTime)
                runningTime.style.width = (musicPlayer.currentTime / musicPlayer.duration) * 100 + '%'


                //nút tua ngược bài hát -5s bằng nút tua ngược
                const backWard = $('.backwardBtn')
                backWard.onclick = (e) => {
                    musicPlayer.currentTime -= 5
                    currentDuration.innerHTML = convertToMinuteAndSecond(musicPlayer.currentTime)
                    runningTime.style.width = (musicPlayer.currentTime / musicPlayer.duration) * 100 + '%'
                }

                //nút tua nhanh bài hát +5s bằng nút tua nhanh
                const forWard = $('.forwardBtn')
                forWard.onclick = (e) => {
                    musicPlayer.currentTime += 5
                    currentDuration.innerHTML = convertToMinuteAndSecond(musicPlayer.currentTime)
                    runningTime.style.width = (musicPlayer.currentTime / musicPlayer.duration) * 100 + '%'
                }

                //tua bài hát bằng cách bấm vào thanh timeline
                runningBar.onclick = (e) => {
                    musicPlayer.currentTime = e.offsetX / runningBar.clientWidth * musicPlayer.duration
                    currentDuration.innerHTML = convertToMinuteAndSecond(musicPlayer.currentTime)
                    runningTime.style.width = (musicPlayer.currentTime / musicPlayer.duration) * 100 + '%'
                }
            }
        }
        //active bài đang chạy trong list
        const musicItems = $$('.musicItem')
        musicItems.forEach((item, index) => {
            setTimeout(() => {
                if (index === currentIndex) {
                    item.classList.add("active")
                } else {
                    item.classList.remove("active")
                }
            },100)
        })
        this.scrollSong()

        //hàm convert giây sang phút:giây
        function convertToMinuteAndSecond(duration) {
            const minute = Math.floor(duration / 60)
            const second = Math.floor(duration % 60)
            return `${minute}:${second < 10 ? '0' + second : second}`
        }
    },

    loadSongList() {

        //render list bài hát
        let songList = ''
        this.songs.forEach((song) => {
            songList += `
                <div class="musicItem">
                    <div class="itemNumber">${song.id < 10 ? '0' + String(song.id + 1) : song.id + 1}</div>
                    <div class="boundary"></div>
                    
                    <div class="musicItemInfo">
                        <p class="musicItemName">${song.name}</p>
                        <p class="musicItemSinger">${song.singer}</p>
                    </div>
                    <div class="itemBar">
                        <i class="itemBarIcon fa-solid fa-bars"></i>
                    </div>
                </div>
            `
        })
        musicListTheme.innerHTML = songList
        //active vào bài đầu tiên
        $('.musicItem').classList.add('active')
    },

    //scroll music item lên giữa musicListTheme
    scrollSong() {
        setTimeout(() => {
            let currentItem = $('.musicItem.active')
            let currenId = Number(currentItem.querySelector('.itemNumber').textContent)
            if (currenId == 1){
                musicListTheme.scrollTop = 0
            }
            else {
                musicListTheme.scrollTop = (currenId - 2) * 50
            }
        }, 100)
    },

    //lùi bài hát 
    prevSong() {
        if (!playMusicBtn.classList.contains('playing')) {
            playMusicBtn.classList.add('playing')
        }
        if (this.currentIndex == 0) {
            this.currentIndex = this.songs.length
        }
        --this.currentIndex
        this.loadCurrentSong()
    },

    //next bài hát 
    nextSong() {
        if (!playMusicBtn.classList.contains('playing')) {
            playMusicBtn.classList.add('playing')
        }
        if (this.currentIndex == this.songs.length - 1) {
            this.currentIndex = 0
        }
        else ++this.currentIndex
        this.loadCurrentSong()
    },

    //shuffle bài hát 
    shuffleSong() {
        if (this.isShuffle) {
            this.currentIndex = getRandomIndex(this.songs)
            function getRandomIndex(songs) {
                return Math.floor(Math.random() * songs.length)
            }
        }
    },

    handleEvent() {
        const _this = this

        //handle playing nhạc
        playMusicBtn.onclick = (e) => {
            e.preventDefault()
            _this.isPlaying = !_this.isPlaying
            playMusicBtn.classList.toggle('playing')
            if (_this.isPlaying) {
                musicPlayer.play()
            }
            else {
                musicPlayer.pause()
            }
        }

        //handle nút loop bài hát 
        const loopBtn = $('.loopBtn')
        loopBtn.onclick = (e) => {
            _this.isLoop = !_this.isLoop
            if (_this.isLoop) {
                musicPlayer.loop = true
                loopBtn.classList.add('active')
            }
            else {
                musicPlayer.loop = false
                if (loopBtn.classList.contains('active'))
                    loopBtn.classList.remove('active')
            }

        }

        //handle nút shuffle bài hát 
        const shuffleBtn = $('.shuffleBtn')
        shuffleBtn.onclick = (e) => {
            _this.isShuffle = !_this.isShuffle
            if (_this.isShuffle) {
                shuffleBtn.classList.add('active')
                _this.shuffleSong()
            }
            else {
                if (shuffleBtn.classList.contains('active'))
                    shuffleBtn.classList.remove('active')
            }
        }

        //click vào nút lùi
        const prevBlock = $('.prevBlock')
        if (prevBlock) {
            prevBlock.onclick = (e) => {
                setTimeout(function () {
                    _this.isPlaying = true
                    if (_this.isShuffle == true) {
                        _this.shuffleSong()
                    }
                    _this.prevSong()
                }, 100)
            }
        }

        //next bài hát
        const nextBlock = $('.nextBlock')
        if (nextBlock) {
            nextBlock.onclick = (e) => {
                setTimeout(function () {
                    _this.isPlaying = true
                    if (_this.isShuffle == true) {
                        _this.shuffleSong()
                    }
                    _this.nextSong()
                }, 100)
            }
        }
        //hết bài hát tự chuyển bài
        musicPlayer.onended = (e) => {
            if (_this.isShuffle == true) {
                _this.shuffleSong()
            }
            _this.nextSong()
        }

        //khi click vào từng music item
        let musicItems = $$('.musicItem')
        musicItems.forEach((musicItem, index) => {
            musicItem.onclick = (e) => {
                musicItems.forEach((musicItem) => {
                    musicItem.classList.remove('active')
                })
                musicItem.classList.add('active')
                _this.currentIndex = index
                _this.loadCurrentSong()
                _this.isPlaying = true

                if (!playMusicBtn.classList.contains('playing'))
                    playMusicBtn.classList.add('playing')
            }
        })
    },
    start() {
        this.loadCurrentSong()
        this.loadSongList()
        this.handleEvent()
    },
}

app.start()
