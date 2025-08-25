/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { completed } = await request.json()
    const todo = await prisma.todo.update({
      where: { id: params.id },
      data: { completed },
    })
    return NextResponse.json(todo)
  } catch (error) {
    console.error('Erreur Prisma:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de la todo' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.todo.delete({
      where: { id: params.id },
    })
    return NextResponse.json({ message: 'Todo supprimée' })
  } catch (error) {
    console.error('Erreur Prisma:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la todo' },
      { status: 500 }
    )
  }
}