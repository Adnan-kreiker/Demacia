import { describe, expect, it } from "vitest";
import { capitalize } from '../../utils'

describe('capitalize', () => {
  it('capitalizes the first letter of a string', () => {
    expect(capitalize('hello')).toEqual('Hello')
  })

  it('does not change the capitalization of the rest of the string', () => {
    expect(capitalize('HELLO')).toEqual('Hello')
  })
})