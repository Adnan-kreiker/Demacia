import { describe, expect, it } from "vitest";
import { replaceUnderscoreWithSpace } from '../../utils'

describe('replaceUnderscoreWithSpace', () => {
  it('it replaces all underscores with spaces', () => {
    expect(replaceUnderscoreWithSpace('hello_world')).toEqual('hello world')
    expect(replaceUnderscoreWithSpace('hello_world__again')).toEqual('hello world  again')
  })
})