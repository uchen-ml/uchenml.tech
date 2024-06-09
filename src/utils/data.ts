const services = [
  {
    title: "Easy to Integrate",
    description:
      "Build model as a native or WebAssembly  library, and integrate with your existing systems.",
  },
  {
    title: "Wide Range of Platforms",
    description:
      "Native libraries with the support for most modern platforms. WebAssembly support for running in a web browser.",
  },
  {
    title: "Ease of Deployment",
    description:
      "No additional dependencies. No need to change your existing deployment process.",
  },
  {
    title: "Fast and Efficient",
    description: "Small download size. Low memory usage.",
  },
  {
    title: "For Software Developers",
    description:
      "Designed for software developers. No need to learn new tools or languages.",
  },
  {
    title: "Performance",
    description:
      "Native code. Uses your CPUs to its full potential. No garbage collection pauses.",
  },
];

enum ComponentState {
  inuse,
  planning,
}

const components = [
  {
    title: "Uchen Runtime",
    description:
      "Experience high-performance and efficient model inference with Uchen " +
      "Runtime, a C++20 runtime that integrates seamlessly with modern " +
      "platforms with compatible compilers.",
    state: ComponentState.inuse,
    color: "fuchsia-500",
  },
  {
    title: "Uchen Core",
    description:
      "Uchen Core is a C++20 library and set of command-line tools designed " +
      "for training machine learning models. It supports common workflows " +
      "with a particular focus on reinforcement learning algorithms.",
    state: ComponentState.inuse,
    color: "indigo-300",
  },
  {
    title: "Uchen Console",
    description:
      "Uchen Console is a hosted tool for quick onboarding and managing " +
      "Uchen models. Intuitive interface for managing model versions, " +
      "datasets and deployment targets.",
    state: ComponentState.planning,
    color: "orange-500",
  },
  {
    title: "Uchen Brain Surgeon",
    description:
      "Uchen Brain Surgeon is a hosted tool for debugging and refactoring " +
      "Uchen models. It offers deep insights into the model's \"way of " +
      'thinking" and encourages teams to explore new ideas.',
    color: "cyan-500",
  },
];

export { components, services };
