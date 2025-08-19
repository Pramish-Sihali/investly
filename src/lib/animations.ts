export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const
    }
  }
};

export const slideIn = (direction: 'left' | 'right') => ({
  hidden: {
    x: direction === 'left' ? -50 : 50,
    opacity: 0
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const
    }
  }
}); 