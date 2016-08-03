/* @flow */
import * as Redux from 'redux'
Redux.createStore()

let b = 1
let a: Array<number> = []


a = a.concat([1, 2])

document.addEventListener('click', (e) => {
  e.toString()
})

a.reverse()

b = 'aaaa'
b.charAt(1)

let c:string|number = 'aa'
c = 1
c.toString()


function add(a1: number, a2: number): number { // 定义函数的参数和返回值的类型
  return a1 + a2
}


const dd = add(1, 2)

dd.toString()


function reversed<T>(array: T[]): T[] {
  const ret = []
  let i = array.length
  while (i--) {
    ret.push(array[i])
  }
  return ret
}


reversed([1, 2, 3])

const t: (number|string)[] = [1, 2, 3]

t.reverse()

const d6: Array<?number> = [null, undefined]

d6.reverse()
