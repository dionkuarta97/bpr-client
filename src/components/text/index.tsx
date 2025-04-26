import { twMerge } from 'tailwind-merge';

interface TextProps {
  label: string;
  className?: string;
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'button'
    | 'overline';
  color?: string;
}

const variantMap = {
  h1: 'text-2xl font-[700]',
  h2: 'text-xl font-[700]',
  h3: 'text-lg font-[700]',
  h4: 'text-base font-[700]',
  h5: 'text-sm font-[700]',
  h6: 'text-xs font-[700]',
  body1: 'text-sm',
  body2: 'text-xs',
  caption: 'text-xs',
  button: 'text-sm',
  overline: 'text-xs',
} as const;

const Text = ({
  label,
  className,
  variant = 'body1',
  color = 'text-text-secondary',
}: TextProps) => {
  const variantClass = variantMap[variant];
  return <p className={twMerge(variantClass, color, className)}>{label}</p>;
};

export default Text;
