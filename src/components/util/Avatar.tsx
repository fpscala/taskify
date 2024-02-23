import { TooltipWrapper } from "../ui/tooltip";
import { UnassignedUser } from "../svgs";
type AvatarProps = {
  src: string | null | undefined;
  alt: string;
  size?: number;
};
const Avatar = ({ src, alt, size = 8, ...props }: AvatarProps) => {
  return (
    <TooltipWrapper text={alt}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`rounded-full h-${size} w-${size}`}
        />
      ) : (
        <div>
          <UnassignedUser
            size={size}
            className="h-fit w-fit rounded-full bg-gray-200 text-gray-500"
          />
        </div>
      )}
    </TooltipWrapper>
  );
};

export { Avatar };
