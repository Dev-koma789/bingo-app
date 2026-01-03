"use strict";

{
  // ==============================
  // 1列分（B / I / N / G / O）の
  // ビンゴ数字を作る関数
  // col : 列番号（0〜4）
  // ==============================
  function createColumn(col) {
    // この列で使える数字の候補を作る配列
    // 例：col=0 → 1〜15
    //     col=1 → 16〜30
    const source = [];
    for (let i = 0; i < 15; i++) {
      source[i] = i + 1 + 15 * col;
    }

    // 実際にビンゴカードに使う5個の数字
    const column = [];

    // 候補（source）の中からランダムに5個選ぶ
    // splice を使って「取り出した数字は候補から削除」する
    // → 同じ数字が2回出ない
    for (let i = 0; i < 5; i++) {
      column[i] = source.splice(
        Math.floor(Math.random() * source.length), // ランダムな位置
        1 // 1個取り出す
      )[0]; // 取り出した値
    }

    // 1列分（縦5マス）を返す
    return column;
  }

  // ==============================
  // ビンゴカード全体（5列分）を作る
  // ==============================
  function createColumns() {
    const columns = [];

    // B I N G O の5列を作る
    for (let i = 0; i < 5; i++) {
      columns[i] = createColumn(i);
    }

    // 真ん中（N列・3行目）を FREE にする
    columns[2][2] = "FREE";

    // 列ごとのデータを返す
    // columns[col][row] の形
    return columns;
  }

  // ==============================
  // ビンゴカードを HTML の table に描画する
  // columns : 列ごとのビンゴデータ
  // ==============================
  function renderBingo(columns) {
    // 行（横方向）を1行ずつ作る
    for (let row = 0; row < 5; row++) {
      // <tr>（テーブルの1行）を作成
      const tr = document.createElement("tr");

      // 列（縦方向）のデータを横に並べる
      for (let col = 0; col < 5; col++) {
        // <td>（テーブルの1マス）を作成
        const td = document.createElement("td");

        // columns[col][row] を使って
        // 「列で持っているデータ」を「行として表示」
        td.textContent = columns[col][row];

        // <tr> の中に <td> を追加
        tr.appendChild(td);
      }

      // 完成した1行を <tbody> に追加
      document.querySelector("tbody").appendChild(tr);
    }
  }

  // ==============================
  // 実行部分
  // ==============================

  // ビンゴカード用の数字を作成
  const columns = createColumns();

  // 作ったデータを table に表示
  renderBingo(columns);
}
