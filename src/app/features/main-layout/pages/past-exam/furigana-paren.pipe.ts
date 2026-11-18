// Cores
import { Pipe, PipeTransform } from '@angular/core';

const ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;' };
/** 漢字（ひらがな・カタカナ）：括號裡全是假名才轉換，避免誤轉中文註解 */
const PAREN_READING = /([一-鿿々〆ヶ]+)（([ぁ-ゖァ-ヺー・]+)）/g;

/** 把「漢字（かな）」轉成 `<ruby>` 標註（其餘文字已跳脫），給 `[innerHTML]` 使用 */
export function parenFuriganaToRuby(text: string): string {
  const escaped = text.replace(/[&<>]/g, (c) => ESCAPES[c]);
  return escaped
    .replace(PAREN_READING, '<ruby>$1<rt>$2</rt></ruby>')
    // 解析裡的 **重點詞**：顯示成紅色粗體，不要把星號露出來
    .replace(/\*\*(.+?)\*\*/g, '<b class="font-extrabold text-accent">$1</b>');
}

@Pipe({ name: 'parenFurigana', standalone: true })
export class ParenFuriganaPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return value ? parenFuriganaToRuby(value) : '';
  }
}
