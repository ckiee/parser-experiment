const LexerSeperator = /\(|\)|\+|-\/|\*/
class Lexer {
    pos: number;
    data: string;
    lastPart?: string;
    tokens: string[];
    constructor(data: string) {
        this.data = data;
        this.pos = 0;
        this.tokens = [];
    }
    get char() {
        return this.data[this.pos];
    }
    process() {
        if (LexerSeperator.test(this.char)) {
            if (this.lastPart) {
                this.tokens.push(this.lastPart);
                this.lastPart = "";  
            } else throw new Error("Lexer started with a seperator char");
        } else {
            this.lastPart = this.char
        }
    }
}
