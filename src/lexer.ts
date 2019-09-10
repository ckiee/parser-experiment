import Token, { AddOpToken, NumberToken, WhitespaceToken } from "./lexerTokens";

export function error(msg: string) {
    console.error(msg);
    process.exit(1);
}
// const LexerSeperator = /\(|\)|\+|-\/|\*/

export default class Lexer {
    pos: number;
    data: string;
    last?: string;
    lastType?: Token;
    tokens: string[];
    constructor(data: string) {
        this.data = data + "\n";
        this.pos = 0;
        this.tokens = [];
    }
    get char() {
        return this.data[this.pos];
    }
    matchButNoActionsYet(token: Token) {
        if (this.lastType) {
            console.log(this.lastType.type, "->", token.type, `(${this.pos})`);
            this.lastType.end(this, token);
        }
    }
    process() {
        if (AddOpToken.regex.test(this.char)) {
            this.matchButNoActionsYet(AddOpToken);
            this.lastType = AddOpToken;
            // this.last = this.char;
            // ^ Not multi char token
            this.tokens.push(this.char);
        } else if (NumberToken.regex.test(this.char)) {
            this.matchButNoActionsYet(NumberToken);
            if (this.lastType == NumberToken) {
                this.last += this.char;
            } else {
                this.last = this.char;
                this.lastType = NumberToken;
            } 
        } else if (WhitespaceToken.regex.test(this.char)) {
            this.matchButNoActionsYet(WhitespaceToken);
            this.lastType = WhitespaceToken;
        } else {
            error(`Invalid character: "${this.char}" at position ${this.pos}`);
        }
        // if (this.lastType && lastTypeBefore) {
            // lastTypeBefore.end(this);
            // console.log(lastTypeBefore.type, "->", this.lastType.type, `(${this.pos})`);
        // }
        // console.log(this, this.char);
        this.pos++;
    }
    processAllData() {
        while (this.pos < this.data.length) {
            this.process();
        }
        // if (this.lastType) {
            // this.lastType.end(this);
        // }
    }
}

const lexer = new Lexer("12+11");
lexer.processAllData();
console.log("Output", lexer.tokens)