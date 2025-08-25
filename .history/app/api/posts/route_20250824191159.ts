/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(todos)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des todos' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title } = await request.json()
    const todo = await prisma.todo.create({
      data: { title },
    })
    return NextResponse.json(todo, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la création de la todo' },
      { status: 500 }
    )
  }
}

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
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la todo' },
      { status: 500 }
    )
  }
}