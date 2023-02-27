import {it,expect} from 'jest'

it("Should be test enviroment",()=>{
    expect(process.env.NODE_ENV).toBe("test")
})