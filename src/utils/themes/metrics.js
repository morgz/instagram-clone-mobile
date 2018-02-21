const makeCircle = size => ({
  height: size,
  width: size,
  borderRadius: size / 2,
});

export { makeCircle };

const makeHitSlop = size => ({
  left: size,
  right: size,
  top: size,
  bottom: size,
});

export { makeHitSlop };
