_:
    @just --list

# Development

# Start both server and client in watch mode
[group('dev')]
dev: _check-node_modules
    @bunx concurrently -n server,client -c green,blue 'just dev-server' 'just dev-client'

# Start server in watch mode
[group('dev')]
[working-directory('server')]
dev-server: _check-node_modules
    bun run dev

# Start client in watch mode
[group('dev')]
[working-directory('client')]
dev-client: _check-node_modules
    bun run dev

# Building

# Build everything
[group('build')]
build: build-server build-client

# Build server
[group('build')]
[working-directory('server')]
build-server: _check-node_modules
    bun run build

# Build client
[group('build')]
[working-directory('client')]
build-client: _check-node_modules
    bun run build

# Testing

# Run tests
[group('test')]
[working-directory('server')]
test: _check-node_modules
    bun test

# Linting and Formatting

# Run all checks (format, lint)
[group('quality')]
check: check-format check-lint

# Run all fixes (format, lint)
[group('quality')]
fix: format lint

# Format code with fixes
[group('quality')]
format: _check-node_modules
    bun run format:fix

# Check formatting (no fixes)
[group('quality')]
check-format: _check-node_modules
    bun run format

# Lint code with fixes
[group('quality')]
lint: _check-node_modules
    bun run lint:fix

# Check linting (no fixes)
[group('quality')]
check-lint: _check-node_modules
    bun run lint

# Utilities

# Clean build artifacts and node_modules
[group('utils')]
clean:
    rm -rf node_modules client/node_modules server/node_modules
    rm -rf client/.astro client/dist server/dist

# Install dependencies
[group('utils')]
install:
    bun install

# Internal stuff

_check-node_modules:
    @if [ ! -d node_modules ]; then \
        printf '\033[0;33m⚠️ node_modules not found, running bun install...\033[0m\n'; \
        bun install; \
    fi
