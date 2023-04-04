class InputHandler{
    constructor() {
        this.keys = [];
        const keyArr = [
            'ArrowUp',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight',
            'r',
        ];
        this.keyArr = Object.assign([], keyArr);

        window.addEventListener('keydown', (e) => {
            if(keyArr.includes(e.key) && !this.keys.includes(e.key)) {
                this.keys.push(e.key);
            }
        })

        window.addEventListener('keyup', (e) => {
            let index = this.keys.indexOf(e.key);
            this.keys.splice(index, 1);
            console.log(this.keys);
        })
    }

    touchPress(keyName) {
        if(this.keyArr.includes(keyName) && !this.keys.includes(keyName)) {
            this.keys.push(keyName);
        }
    }

    touchRelease(keyName) {
        let index = this.keys.indexOf(keyName);
        this.keys.splice(index, 1);
    }
}

export default InputHandler;