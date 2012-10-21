function newline(element) {
  if($('#' + element).text() !== '') {
    return '<br/>';
  }
  return '';
}