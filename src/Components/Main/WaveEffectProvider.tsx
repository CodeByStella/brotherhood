// WaveEffectProvider.tsx
"use client"; // This ensures that this component is a client component

import { ConfigProvider, ConfigProviderProps, GetProp } from "antd";

type WaveConfig = GetProp<ConfigProviderProps, 'wave'>

const WaveEffectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const createHolder = (node: HTMLElement) => {
    const { borderWidth } = getComputedStyle(node);
    const borderWidthNum = parseInt(borderWidth, 10);

    const div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.inset = `-${borderWidthNum}px`;
    div.style.borderRadius = 'inherit';
    div.style.background = 'transparent';
    div.style.zIndex = '999';
    div.style.pointerEvents = 'none';
    div.style.overflow = 'hidden';
    node.appendChild(div);

    return div;
  };

  const createDot = (holder: HTMLElement, color: string, left: number, top: number, size = 0) => {
    const dot = document.createElement('div');
    dot.style.position = 'absolute';
    dot.style.left = `${left}px`;
    dot.style.top = `${top}px`;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.borderRadius = '50%';
    dot.style.background = color;
    dot.style.transform = 'translate(-50%, -50%)';
    dot.style.transition = 'all 1s ease-out';
    holder.appendChild(dot);

    return dot;
  };

  const showEffect: WaveConfig['showEffect'] = (node, { event, component }) => {
    if (component !== 'Button') {
      return;
    }

    const holder = createHolder(node);

    const rect = holder.getBoundingClientRect();

    const left = event.clientX - rect.left;
    const top = event.clientY - rect.top;

    const dot = createDot(holder, 'rgba(255, 255, 255, 0.65)', left, top);

    // Motion
    requestAnimationFrame(() => {
      dot.ontransitionend = () => {
        holder.remove();
      };

      dot.style.width = '200px';
      dot.style.height = '200px';
      dot.style.opacity = '0';
    });
  };

  return (
    <ConfigProvider wave={{ showEffect }}>
      {children}
    </ConfigProvider>
  );
};

export default WaveEffectProvider;