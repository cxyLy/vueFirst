export const isMac = () => {
  const UAInfo = window.navigator.userAgent

  if (UAInfo.indexOf('Mac OS') > -1) {
    return true
  }
  return false
}

export function clearSelections() {
  if (window.getSelection) {
    window.getSelection().removeAllRanges()
  } else if (document.selection && document.selection.empty) {
    document.selection.empty()
  }
}