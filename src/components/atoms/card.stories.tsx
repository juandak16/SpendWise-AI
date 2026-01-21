import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';
import { Button } from './button';

/**
 * Card - Container component
 *
 * The Card atom provides a styled container for
 * grouping related content with consistent styling.
 */
const meta: Meta<typeof Card> = {
  title: 'Atoms/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

/**
 * Basic card container
 */
export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardContent>
        <p className="text-slate-600 dark:text-slate-300">
          Contenido básico de una tarjeta.
        </p>
      </CardContent>
    </Card>
  ),
};

/**
 * Card with header
 */
export const WithHeader: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Título de Tarjeta</CardTitle>
        <CardDescription>Descripción opcional del contenido.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-slate-600 dark:text-slate-300">
          El contenido principal va aquí.
        </p>
      </CardContent>
    </Card>
  ),
};

/**
 * Card with footer
 */
export const WithFooter: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Confirmar Acción</CardTitle>
        <CardDescription>¿Estás seguro de continuar?</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Esta acción no se puede deshacer.
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="secondary" size="sm">Cancelar</Button>
        <Button variant="primary" size="sm">Confirmar</Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * Expense summary card example
 */
export const ExpenseSummary: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
            <span className="text-white text-lg">💰</span>
          </div>
          <div>
            <CardTitle>Total Gastado</CardTitle>
            <CardDescription>Este mes</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          $1,234.56
        </p>
        <p className="text-sm text-emerald-600 mt-1">
          ↓ 12% vs mes anterior
        </p>
      </CardContent>
    </Card>
  ),
};

/**
 * Category card example
 */
export const CategoryCard: Story = {
  render: () => (
    <Card className="w-60">
      <CardContent className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
          style={{ backgroundColor: '#f9731615' }}
        >
          🍔
        </div>
        <div>
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            Alimentación
          </p>
          <p className="text-sm text-slate-500">
            35% del total
          </p>
        </div>
      </CardContent>
    </Card>
  ),
};
