# Contributing to Precast Icons

Thank you for your interest in contributing to Precast Icons! We welcome contributions from the community.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## How to Contribute

### Reporting Issues

1. Check if the issue already exists in the [issue tracker](https://github.com/BuunGroup-Packages/npm-precast-icons/issues)
2. Use the appropriate issue template (bug report, feature request, or icon request)
3. Provide as much detail as possible

### Suggesting New Icons

1. Use the icon request template
2. Ensure the icon fits with our minimalist, stroke-based design philosophy
3. Check that a similar icon doesn't already exist

### Submitting Pull Requests

1. Fork the repository
2. Create a new branch for your feature (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting:
   ```bash
   npm run lint
   npm run typecheck
   npm run lint:svg  # If adding/modifying SVG files
   npm test
   ```
5. Format your code:
   ```bash
   npm run format
   ```
6. Commit your changes following conventional commits:
   ```bash
   git commit -m "feat: add new icon for bluetooth"
   git commit -m "fix: correct viewBox for wifi icon"
   git commit -m "docs: update usage examples"
   ```
7. Push to your branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request using the PR template

## Development Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/BuunGroup-Packages/npm-precast-icons.git
   cd npm-precast-icons
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the icons:

   ```bash
   npm run generate-icons
   ```

4. Start development:
   ```bash
   npm run dev
   ```

## Icon Design Guidelines

When creating or modifying icons:

- **ViewBox**: All icons must use `0 0 24 24` viewBox
- **Style**: Follow stroke-based design (not filled)
- **Stroke Width**: Default stroke width of 2
- **Simplicity**: Keep designs minimal and clear
- **Consistency**: Match the visual style of existing icons
- **Scalability**: Icons should look good at all sizes

### SVG Requirements

- No inline styles
- No unnecessary groups or elements
- Clean, optimized paths
- Proper element structure

## Coding Standards

### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow the existing code style (enforced by ESLint and Prettier)
- Write clear, self-documenting code
- Add JSDoc comments for public APIs

### React Components

- Use functional components with hooks
- Properly type all props
- Support ref forwarding where appropriate
- Maintain backward compatibility

### Testing

- Write tests for new functionality
- Ensure existing tests pass
- Test across different frameworks (React, Vue, Svelte)

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Test additions or changes
- `chore:` Build process or auxiliary tool changes

## Release Process

Releases are managed by maintainers. We use semantic versioning:

- **Major**: Breaking changes
- **Minor**: New features (backward compatible)
- **Patch**: Bug fixes and minor improvements

## Questions?

Feel free to open a [discussion](https://github.com/BuunGroup-Packages/npm-precast-icons/discussions) if you have questions or need help.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
