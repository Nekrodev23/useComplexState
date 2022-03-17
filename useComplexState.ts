import { useState, useCallback } from 'react'

function useComplexState<State>(
  initialState: State
): [
  state: State,
  setNewState: (
    value: Partial<State> | ((state: State) => Partial<State>)
  ) => void
] {
  const [state, setState] = useState<State>(initialState)

  const setNewState = useCallback(
    (value: Partial<State> | ((state: State) => Partial<State>)) => {
      if (typeof value === 'function') {
        setState((_state) => ({ ..._state, ...value(_state) }))
      }

      setState((_state) => ({ ..._state, ...value }))
    },
    [setState]
  )

  return [state, setNewState]
}

export default useComplexState
