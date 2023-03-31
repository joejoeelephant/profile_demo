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
}

export default InputHandler;