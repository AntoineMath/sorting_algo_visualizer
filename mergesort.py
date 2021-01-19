def mergesort(a):
    if len(a) == 1:
        return a

    array_one = a[0 : int(len(a) / 2)]
    array_two = a[len(array_one) :]

    # print(f"array_one: {array_one}, array_two: {array_two}\n")

    array_one = mergesort(array_one)
    array_two = mergesort(array_two)

    return merge(array_one, array_two)


def merge(a, b):
    c = []

    while a and b:
        if a[0] > b[0]:
            c.append(b[0])
            b = b[1:]
        else:
            c.append(a[0])
            a = a[1:]

    while a:
        c.append(a[0])
        a = a[1:]
    while b:
        c.append(b[0])
        b = b[1:]
    print(f"merge : {c}")

    return c


if __name__ == "__main__":
    array = [1, 4, 2, 8, 6, 20, 5]
    print(array)
    print(mergesort(array))
