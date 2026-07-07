import { describe, it, expect } from "vitest";
import { diffWords } from "./diff.js";

const changed = side => side.filter(t => t.changed).map(t => t.text);

describe("diffWords", () => {
  it("identical strings: nothing changed", () => {
    const d = diffWords("Napunite svoj uređaj.", "Napunite svoj uređaj.");
    expect(changed(d.target)).toEqual([]);
    expect(changed(d.reference)).toEqual([]);
  });

  it("substitution: flags the word on both sides", () => {
    const d = diffWords("Napunite vaš uređaj.", "Napunite svoj uređaj.");
    expect(changed(d.target)).toEqual(["vaš"]);
    expect(changed(d.reference)).toEqual(["svoj"]);
  });

  it("typo: flags misspelled word and its correction", () => {
    const d = diffWords("zbog sumljive aktivnosti.", "zbog sumnjive aktivnosti.");
    expect(changed(d.target)).toEqual(["sumljive"]);
    expect(changed(d.reference)).toEqual(["sumnjive"]);
  });

  it("omission: flags missing words only on the reference side", () => {
    const d = diffWords("Spremite napredak prije izlaska.", "Spremite svoj napredak prije izlaska.");
    expect(changed(d.target)).toEqual([]);
    expect(changed(d.reference)).toEqual(["svoj"]);
  });

  it("missing terminal punctuation: flags the last word pair", () => {
    const d = diffWords("sumnjive aktivnosti", "sumnjive aktivnosti.");
    expect(changed(d.target)).toEqual(["aktivnosti"]);
    expect(changed(d.reference)).toEqual(["aktivnosti."]);
  });

  it("number error: flags the number", () => {
    const d = diffWords("zaradiš 5000 zlatnika.", "zaradiš 500 zlatnika.");
    expect(changed(d.target)).toEqual(["5000"]);
    expect(changed(d.reference)).toEqual(["500"]);
  });
});
