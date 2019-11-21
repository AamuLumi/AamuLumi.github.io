---
layout: post
title: "Type the Untypable: 101 for Advanced Typings in Typescript"
date: 2019-03-05 12:00:00 +0100
categories: en programmation
tags: typescript snippets hints
---

_You use Typescript. You want to type the world. But you don’t want to read the whole Typescript doc. So here I come with this introduction to Typescript advanced typings with all type tricks you need._

{% include image.html url="/assets/images/typescript.jpeg" description="Yeah, I needed an image for this article, so I create this epic Typescript moment." %}

_Note: this article is not an introduction for Typescript beginners. I’m considering you’re here with a bit of Typescript experience and you need to go further in Typescript world. If you never used Typescript, please take a look at lease to this tutorial and take the time to manipulate some Typescript code._

 - Typescript in 5 minutes: [https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)

## Dynamically type a function

You need to create a function which can have different returns types according to its parameters.

### Code

{% highlight typescript %}
const f = <T>(param1: T): T => { return param1; }
{% endhighlight %}

### Usage

{% highlight typescript %}
const createStore = <T> (mainReducer: Reducer<T>): Store<T> => {…}
const someStore = createStore(someTypedReducer);
{% endhighlight %}

### Explanation

This feature works like the _infer_ syntax. We describe a **generic type** T which will be determined by the Typescript compiler each time you will use the function f. You can use this type to create a complex return type like in **Usage**.

This is a very powerful feature which allows the creation of complex auto-inferred types.

You can take a look in [Typescript 2.4](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-4.html) notes to see some other examples.

{% include image.html url="/assets/gif/yeah1.gif" description="" %}

## Non Nullable type

You need to forbid a variable to be null (or undefined).

### Code

{% highlight typescript %}
type NonNullable<T> = T extends null | undefined ? never : T;
{% endhighlight %}

**Important note: NonNullable is available in global Typescript context**

### Usage

{% highlight typescript %}
NonNullable<string | null> // string
{% endhighlight %}

### Explanation

We need to use a [Typescript 2.8](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html) trick with a _distributive conditional type_.

If we take `T = string | undefined`, we reduce the code with this:

{% highlight typescript %}
NonNullable<string|undefined> = (string extends undefined | null ? never : T) | (undefined extends undefined | null ? never : T);
{% endhighlight %}

So we check each type of T and if one of these types is *null* or *undefined*, it will be replaced by never which is the Typescript way to remove a type.

You can also define a *Diff* type to remove any type from T:

{% highlight typescript %}
type Diff<T, U> = T extends U ? never : T;
{% endhighlight %}

{% include image.html url="/assets/gif/good1.gif" description="" %}

## Return Type of a function

### Code

{% highlight typescript %}
type ReturnType<T> = T extends (…args: any[]) => infer R ? R : any;
{% endhighlight %}

**Important note: ReturnType is available in global Typescript context.**

### Usage

{% highlight typescript %}
const f = () => 2;
ReturnType<typeof f> // number
{% endhighlight %}

### Explanation

Another [Typescript 2.8](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html) use here.

`infer` keyword tells to the compiler to get the type of a variable. We check if T is a function and telling to the compiler to associate a type R to the type of the return. So we just have to return the type R if T is a function.

{% include image.html url="/assets/gif/good2.gif" description="" %}

## Instance Type of a class

### Code

{% highlight typescript %}
type InstanceType<T extends new (…args: any[]) => any> = T extends new (…args: any[]) => infer R ? R : any;
{% endhighlight %}

**Important note: InstanceType is available in global Typescript context.**

### Usage

{% highlight typescript %}
class C { constructor() {} }
InstanceType<typeof C> // C
{% endhighlight %}

### Explanation

Always [Typescript 2.8](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html) use here.

This is the same trick as *ReturnType*. We just need to check if the object T extends the function *new* (which is the needed function to create a class in JS). If *new* exists, we just get the return type of the new function.

{% include image.html url="/assets/gif/surprising1.gif" description="" %}

## Set all properties of an object as optional

### Code

{% highlight typescript %}
type Partial<T> = { [P in keyof T]?: T[P] };
{% endhighlight %}

**Important note: Partial is available in global Typescript context.**

### Usage

{% highlight typescript %}
Partial<{ value: number}> // {value?: number}
{% endhighlight %}

### Explanation

We dive in [Typescript 2.1](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html) here.

The syntax used here is the **mapped typed** syntax. We iterate on each key of T (stored each time in the type variable P) and for each key P, we create a new optional property with its value `T[P]`.

It seems complicated at the beginning, but it’s just nothing more than an iteration on all keys of the object T.

{% include image.html url="/assets/gif/yeah2.gif" description="" %}

## Get the type of a function parameter

### Code

{% highlight typescript %}
type FirstParameter<T> = T extends (arg1: infer U, …args: Array<any>) => any ? U : undefined;
type SecondParameter<T> = T extends (arg1: any, arg2: infer U, …args: Array<any>) => any ? U : undefined;
{% endhighlight %}

### Usage

{% highlight typescript %}
const f = (someArg: number, otherArg: string) => true;
FirstParameter<typeof f> // number
SecondParameter<typeof f> // string
{% endhighlight %}

### Explanation

Some custom use of [Typescript 2.8](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html).

`infer` syntax can be used for anything in typing. Here, we just tell to Typescript to create a type U from getting the type of a specific argument when T is a function with enough parameters.

{% include image.html url="/assets/gif/good3.gif" description="" %}

## Make a union with all values of an array/object

You have an array, and you want to create a single union type with all values of an array or an object.

### Code

{% highlight typescript %}
type Union<T> = T[keyof T];
{% endhighlight %}

### Usage

{% highlight typescript %}
Union<{value: number; otherValue: string}> // number | string
{% endhighlight %}

### Explanation

This one looks so ridiculous, but I figure out how to do that after a long time. It’s a custom use of the **mapped types** and **lookup types** of [Typescript 2.1](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html).

We iterate on all keys of T on T itself. The **lookup type** (`keyof T`) gets all keys of T and create a union with all these keys. Accessing to T with a union of keys result by creating a union of values types.

{% include image.html url="/assets/gif/yay1.gif" description="" %}

With these simple tricks, you can now achieve a lot of works in Typescript world.

Don’t hesitate to comment if you have some questions about them. I’m available on this post comments or on my Twitter.

Thanks for reading! :)