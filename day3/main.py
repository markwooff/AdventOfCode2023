import itertools, math, re, os

current_directory = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(current_directory, 'input.txt')

with open(file_path, 'r') as file:
    inputArray = file.read().split("\n")

## Part 1
box = list(itertools.product((-1, 0, 1), (-1, 0, 1)))
parts_by_symbol = {
    (i, j): (x, [])
    for i, l in enumerate(inputArray)
    for j, x in enumerate(l)
    if x != "." and not x.isdigit()
}

part_sum = 0

for i, l in enumerate(inputArray):
    for match in re.finditer(r"\d+", l):
        n = int(match.group(0))
        boundary = {
            (i + di, j + dj)
            for di, dj in box
            for j in range(match.start(), match.end())
        }
        if parts_by_symbol.keys() & boundary:
            part_sum += n
        for symbol in parts_by_symbol.keys() & boundary:
            parts_by_symbol[symbol][1].append(n)

print("Solution for Part 1 is: %s" % part_sum)

## Part 2
print("Solution for Part 2 is: %s" % 
    sum(
        math.prod(parts)
        for symbol, parts in parts_by_symbol.values()
        if len(parts) == 2 and symbol == "*"
    )
)