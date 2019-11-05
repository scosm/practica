
# Dependency Graph

## Description

This is an implementation of a dependency graph, i.e., a directed graph that represents a set of dependencies,
such as might be found in the build dependencies of software files, etc.

The primary objective is to provide an implementation to generate the build order from a build dependency graph.

## Statement of Problem

There is a set of projects (say, N of them) that need to be built. Some projects may have dependencies.
For example, project A has dependencies on projects B and C, so in order to build project A, B and C need to be built first.

Example list of projects and their dependencies (children):

A -> B, C
B -> D
C
D
E -> F, G, H
F
G
H

The objective is to generate the list of projects in the order in which they should be built.
That is, to generate an ordering (as there may be more than one valid order).

Example ordering: H G F E C D B A

## Modules


## Installation

### Python

Install Python 3.7 or above. (It might be ok with 3.4 or higher, but was tested with 3.7.3.)

The following Python modules need to be installed. Use pip install.

- requests
- pytest