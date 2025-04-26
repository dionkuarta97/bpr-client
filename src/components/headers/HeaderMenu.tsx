import Text from '@/components/text';
import useController from './libs/useController';

const HeaderMenu = () => {
  const { menu, handleMenuClick, activeMenu } = useController();

  return (
    <>
      <div className="flex bg-white border-b border-border-secondary py-4 px-20 flex-row gap-2">
        {menu.map(item => (
          <div
            onClick={() => handleMenuClick(item.path)}
            className={`px-6 cursor-pointer flex flex-row gap-2 items-center py-3 rounded-xl ${
              item.isActive
                ? 'bg-accent-default hover:bg-accent-default'
                : 'hover:bg-secondary-default'
            }`}
          >
            {item.icon}
            <Text
              className={`${item.isActive ? 'text-text-on-primary' : 'text-text-secondary'}`}
              key={item.label}
              label={item.label}
              variant="h2"
            />
          </div>
        ))}
      </div>
      <div className="flex bg-background-default py-4 px-20 flex-row">
        <Text label={activeMenu || ''} variant="h1" />
      </div>
    </>
  );
};

export default HeaderMenu;
