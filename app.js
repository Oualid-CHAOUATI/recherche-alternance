class StringEffect {
  constructor() {
    this.init();
    this.createWrapper();
    this.handleToggleEffect();
  }
  init() {
    this.texts = ["ma vie !", "mon oxygène !"];
    this.maxCharIndex = Math.max(this.texts[0].length, this.texts[1].length);

    this._padEndStrings();
    this.textIndex = 0;

    this.parent = document.querySelector("#string-effet");
  }

  _padEndStrings() {
    this.texts = this.texts.map((text) => text.padEnd(this.maxCharIndex, " "));
  }

  _getRandomChar() {
    const ALPHABET = "abcdefghijklmnopqrstuvwxyz";
    const getRandomIndexAlphabet = () =>
      Math.floor(Math.random() * ALPHABET.length);

    return ALPHABET.charAt(getRandomIndexAlphabet());
  }

  _changeTextIndex() {
    this.textIndex++;
    this.textIndex = this.textIndex % this.texts.length;
  }

  createWrapper() {
    const span = document.createElement("span");
    const wrapper = span.cloneNode(true);
    wrapper.classList.add("spans-wrapper");
    this.parent.append(wrapper);

    this.spans = [];
    for (let i = 0; i < this.maxCharIndex; i++) {
      const innerSpan = span.cloneNode(true);
      innerSpan.innerText = this._getRandomChar();
      this.spans.push(innerSpan);
      wrapper.appendChild(innerSpan);
    }

    this.wrapper = wrapper;
  }

  async handleToggleEffect() {
    await this._aplyEffect();

    this._changeTextIndex();
    setTimeout(() => {
      this.handleToggleEffect();
    }, 2000);
  }
  async _aplyEffect() {
    for (let i = 0; i < this.maxCharIndex; i++) {
      const isRestEmpty = this.texts[this.textIndex].slice(i).trim() == "";
      await this._changeSpanChar(this.texts[this.textIndex][i], i, isRestEmpty);
    }
  }

  _changeSpanChar(char, index, rapid = null) {
    console.log(this.spans);
    return new Promise((resolve, reject) => {
      let attemps = Math.random() * 5 + 1;

      const timer = setInterval(
        () => {
          if (attemps < 0) {
            this.spans[index].innerText = char;
            clearInterval(timer);
            return resolve(true);
          } else {
            attemps--;
            this.spans[index].innerText = this._getRandomChar();
          }
        },
        rapid ? 50 : 100
      );
    });
  }
}

new StringEffect();
