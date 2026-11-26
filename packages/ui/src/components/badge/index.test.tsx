import { describe, test, expect, afterEach, vi } from 'vitest';
import { cleanup, fireEvent } from '@testing-library/react';
import { css, styled } from 'styled-components';
import { customRender } from '@/ui/tests';
import { skeleton } from '@/ui/components/skeleton/skeleton.css';
import { typography } from '@/ui/components/typography/typography.css';
import { Badge, BadgeSkeleton, BadgeStyled, BadgeText, BadgeVariant } from '.';
import { badge, badgeSkeleton, badgeText } from './badge.css';
import { BADGE_TEXT_CLASS_NAME } from './constants';

const { variants } = badge.classNames;

afterEach(() => {
  cleanup();
});

describe('badge', () => {
  test('variant, brick and skeleton are classes', () => {
    (['info', 'blue', 'success', 'critic', 'error'] as BadgeVariant[]).forEach(
      (variant) => {
        const { container } = customRender(
          <Badge variant={variant}>text</Badge>,
        );
        const element = container.firstElementChild!;

        expect(element).toHaveClass(
          badge.classNames.base,
          variants.variant[variant],
        );
        expect(element).not.toHaveClass(
          variants.brick.true,
          variants.skeleton.true,
        );
        cleanup();
      },
    );

    const { container } = customRender(
      <Badge
        brick
        skeleton
      />,
    );

    expect(container.firstElementChild).toHaveClass(
      variants.variant.info,
      variants.brick.true,
      variants.skeleton.true,
    );
  });

  test('a string child is a Typography with the badge text classes', () => {
    const { getByText } = customRender(<Badge>text</Badge>);

    expect(getByText('text')).toHaveClass(
      typography.classNames.variants.variant['body-s-medium'],
      badgeText,
      BADGE_TEXT_CLASS_NAME,
    );
  });

  test('skeleton replaces the children', () => {
    const { container, queryByText } = customRender(
      <Badge skeleton>text</Badge>,
    );

    expect(queryByText('text')).toBeNull();
    expect(container.querySelector(`.${skeleton.classNames.base}`)).toHaveClass(
      badgeSkeleton,
    );
  });

  test('passes className, DOM props and mouse handlers through', () => {
    const onMouseEnter = vi.fn();
    const { container } = customRender(
      <Badge
        className="custom"
        id="badge"
        onMouseEnter={onMouseEnter}
      >
        text
      </Badge>,
    );
    const element = container.firstElementChild!;

    fireEvent.mouseEnter(element);

    expect(element).toHaveClass('custom', badge.classNames.base);
    expect(element).toHaveAttribute('id', 'badge');
    expect(element).not.toHaveAttribute('rounded');
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
  });

  test('the BadgeText selector matches the text of a Badge too', () => {
    expect(
      css`
        ${BadgeText} {
          color: red;
        }
      `.join(''),
    ).toContain(`.${BADGE_TEXT_CLASS_NAME}`);

    const { getByText } = customRender(
      <>
        <Badge>own</Badge>
        <Badge>
          <BadgeText $variant="error">child</BadgeText>
        </Badge>
      </>,
    );

    expect(getByText('own')).toHaveClass(BADGE_TEXT_CLASS_NAME);
    expect(getByText('child')).toHaveClass(
      BADGE_TEXT_CLASS_NAME,
      badgeText,
      typography.classNames.variants.variant['body-s-medium'],
    );
  });

  test('legacy styled parts render the badge classes', () => {
    const { container } = customRender(
      <BadgeStyled
        $variant="success"
        $brick
        $rounded
        $skeleton={false}
      >
        <BadgeSkeleton />
      </BadgeStyled>,
    );
    const element = container.firstElementChild!;

    expect(element).toHaveClass(variants.variant.success, variants.brick.true);
    expect(element.firstElementChild).toHaveClass(
      skeleton.classNames.base,
      badgeSkeleton,
    );
  });

  test('a styled() wrapper adds its class', () => {
    const Wrapped = styled(Badge)`
      height: auto;
    `;
    const { container } = customRender(<Wrapped variant="blue">text</Wrapped>);
    const element = container.firstElementChild!;

    expect(element).toHaveClass(variants.variant.blue);
    expect(element.classList.length).toBeGreaterThan(
      badge({ variant: 'blue' }).split(' ').length,
    );
  });
});
