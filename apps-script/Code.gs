/**
 * Confirmaciones — Montse & Luis
 *
 * Cómo activarlo (una sola vez):
 * 1. Abrí el Google Sheet de confirmaciones.
 * 2. Extensiones > Apps Script.
 * 3. Pegá este archivo completo y guardá.
 * 4. Implementar > Nueva implementación > Tipo: Aplicación web.
 *    - Descripción: rsvp
 *    - Ejecutar como: Yo
 *    - Quién tiene acceso: Cualquier persona
 * 5. Copiá la URL (termina en /exec) y pegala en Vercel
 *    como variable de entorno GOOGLE_SCRIPT_URL.
 */

var SHEET_ID = "1o9NDlZzVvOhkL7guv_vMfx2zvvc9KwJajGu9tAN13qA";
var HEADERS = ["Fecha", "Nombre", "Acompañado", "Acompañantes", "Total"];

function getSheet() {
  var ss;
  try {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  } catch (e) {
    ss = null;
  }
  if (!ss) {
    ss = SpreadsheetApp.openById(SHEET_ID);
  }
  var sheet = ss.getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }
  return sheet;
}

function doGet() {
  return json_({ ok: true });
}

function doPost(e) {
  try {
    var data = {};
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      data = e.parameter || {};
    }

    var nombre = String(data.nombre || "").trim();
    var acompanado = data.acompanado === true || data.acompanado === "true" || data.acompanado === "Sí";
    var acompanantes = Number(data.acompanantes || 0);
    if (!isFinite(acompanantes) || acompanantes < 0) acompanantes = 0;
    acompanantes = Math.min(20, Math.floor(acompanantes));
    if (!acompanado) acompanantes = 0;
    var total = 1 + acompanantes;

    if (nombre.length < 2) {
      return json_({ ok: false, error: "Nombre inválido" });
    }

    getSheet().appendRow([
      new Date(),
      nombre,
      acompanado ? "Sí" : "No",
      acompanantes,
      total,
    ]);

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}
