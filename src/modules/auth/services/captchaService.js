const captchaService = {
    genCaptcha() {
        const firstInput = this.generateInt();
        const secondInput = this.generateInt();
        const operatorIndex = this.generateOperatorIndex();
        const operator = this.getOperatorString(operatorIndex);
        let result = this.buildResult(firstInput, secondInput, operatorIndex);
        return {
            firstInput,
            secondInput,
            operator,
            result,
        };
    },

    buildResult(first, second, operatorIdx) {
        let result;
        switch (operatorIdx) {
            case 0:
                result = first + second;
                break;
            case 1:
                result = first * second;
                break;
            default:
                break;
        }
        return result;
    },

    generateInt() {
        return Math.floor(Math.random() * 10);
    },

    generateOperatorIndex() {
        return Math.floor(Math.random() * 2);
    },

    getOperatorString(index) {
        return index === 0 ? '+' : 'x';
    },
};

export default captchaService;
