export const dispatchMenuTrigger = (emit: (arg0: string) => void) => {
  const handlerMenuTrigger = () => {
    emit('menu-trigger')
  }

  return {
    handlerMenuTrigger
  }
}
