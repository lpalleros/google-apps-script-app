function doGet() {
  const output = HtmlService.createTemplateFromFile('index');
  return output
          .evaluate()
          .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
          .addMetaTag('viewport', 'width=device-width, initial-scale=1')
          .setTitle('Web App')
          .setFaviconUrl('https://img.icons8.com/windows/452/mandalorian.png') ;
}

function require(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
  .getContent();
}
