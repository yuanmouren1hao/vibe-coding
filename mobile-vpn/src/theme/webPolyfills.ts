// Web平台的LinearGradient替代方案
export const LinearGradient = ({colors, start, end, style, children, ...props}: any) => {
  const gradientStyle = {
    background: `linear-gradient(135deg, ${colors.join(', ')})`,
    ...style,
  };
  
  return (
    <div style={gradientStyle} {...props}>
      {children}
    </div>
  );
};
