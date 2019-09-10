import Lexer from "./lexer";

export enum TokenType {
    Op = "op",
    Number = "number",
    Whitespace = "whitespace"
}
export default interface Token {
    regex: RegExp,
    type: TokenType,
    end: (lexer: Lexer, token: Token) => void
}

export const AddOpToken = {
    type: TokenType.Op,
    regex: /\+/,
    end: () => {}
} as Token;
export const NumberToken = {
    type: TokenType.Number,
    regex: /[0-9.]/,
    end: (lexer, token) => {
        console.log("NT End", lexer.lastType);
        if (token == NumberToken) return;
        if (lexer.last == undefined) throw new Error("Unreachable condition was somehow reached!!!");
        // const oldLastToken = lexer.tokens.pop();
        lexer.tokens.push(lexer.last);
        // if (oldLastToken) lexer.tokens.push(oldLastToken);
        lexer.last = undefined;   
    }
} as Token;
export const WhitespaceToken = {
    type: TokenType.Whitespace,
    regex: /\s/,
    end: () => {}
} as Token;