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
      "Leverages best software development practices. No need to add new tools or languages.",
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
    title: "Uchen.ML Runtime",
    description:
      "Experience high-performance and efficient model inference with Uchen.ML " +
      "Runtime, a C++20 runtime that integrates seamlessly with modern " +
      "platforms with compatible compilers.",
    state: ComponentState.inuse,
    color: "fuchsia-500",
  },
  {
    title: "Uchen.ML Training Core",
    description:
      "A C++20 library and a collection of command-line tools " +
      "for training machine learning models. Supports common workflows " +
      "with a particular focus on reinforcement learning algorithms.",
    state: ComponentState.inuse,
    color: "indigo-300",
  },
  {
    title: "Uchen.ML Console",
    description:
      "A hosted tool for quick onboarding and managing " +
      "Uchen models. Intuitive interface for managing model versions, " +
      "datasets and deployment targets.",
    state: ComponentState.planning,
    color: "orange-500",
  },
  {
    title: "Uchen.ML Brain Surgeon",
    description:
      "A hosted tool for debugging and refactoring " +
      'Uchen models. It offers deep insights into how the model\'s "thinks"' +
      " and encourages teams to explore new ideas.",
    color: "cyan-500",
  },
];

export { components, services };
