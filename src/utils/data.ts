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
      "The Uchen Runtime is a C++20 high performance, efficient and easy to " +
      "integrate library for running machine learning models. Compatible with " +
      "most modern platforms.",
    state: ComponentState.inuse,
    color: "fuchsia-500",
  },
  {
    title: "Uchen Core",
    description:
      "The Uchen Core is a C++20 library and collection command-line tools for training " +
      "machine learning models. Current focus is on supporting common workflows and " +
      "focus on reinforcement learning algorithms.",
    state: ComponentState.inuse,
    color: "indigo-300",
  },
  {
    title: "Uchen Console",
    description:
      "A hosted tool for quick onboarding and testing of Uchen models. Provides a direct " +
      "download to WebAssembly, without the need to build the model yourself.",
    state: ComponentState.planning,
    color: "orange-500",
  },
  {
    title: "Uchen Brain Surgeon",
    description:
      "A hosted tool for debugging and refactoring Uchen models. Provides deep insights into the " +
      'model "way of thinking" and encourages teams to experiment with new ideas.',
    color: "cyan-500",
  },
];

export { components, services };
