// src/components/dashboard/config/slider-tab/slider-tab.tsx
import * as React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card/card'
import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import { Switch } from '@/components/ui/switch/switch'
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Image from 'next/image'
import { Modal } from '@/components/ui/modal/modal'
import { FilterSelect } from '@/components/ui/filter-select/filter-select'
import { FileUpload } from '@/components/ui/file-upload/file-upload'
import { toast } from '@/hooks/use-toast'

interface Banner {
  id: string
  image: string
  title: string
  url: string
  status: boolean
  targetDevice: 'web' | 'mobile'
}

interface SortableBannerProps {
  banner: Banner
  onEdit: (banner: Banner) => void
  onDelete: (id: string) => void
  onToggleStatus: (id: string) => void
}

function SortableBanner({
  banner,
  onEdit,
  onDelete,
  onToggleStatus,
}: SortableBannerProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: banner.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white border-1 border-neutral-100 rounded-lg overflow-hidden"
    >
      <div className="cursor-move" {...attributes} {...listeners}>
        <Image
          src={banner.image}
          alt={banner.title}
          width={500}
          height={200}
          className="w-full h-40 object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg truncate">
          {banner.title || 'Sem título'}
        </h3>
        <p className="text-sm truncate">
          {banner.url ? (
            <a
              href={banner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-secondary-800 text-sm hover:underline"
            >
              Clique aqui para visualizar a URL
            </a>
          ) : (
            'Sem URL'
          )}
        </p>
        <div className="flex justify-between items-center mt-2">
          <Switch
            checked={banner.status}
            onCheckedChange={() => onToggleStatus(banner.id)}
          />
          <div className="space-x-2">
            <Button
              size="sm"
              className="py-2 px-4 bg-neutral-50 text-neutral"
              onClick={() => onEdit(banner)}
            >
              Editar
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="py-2 px-4 transition-all bg-secondary-200 text-white hover:bg-secondary"
              onClick={() => onDelete(banner.id)}
            >
              Deletar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SliderTab() {
  const [banners, setBanners] = React.useState<Banner[]>([
    {
      id: '1',
      image: '/images/banners/desktop-foqueemseunegocio.jpg',
      title: 'Foque em seu negócio',
      url: '#',
      status: true,
      targetDevice: 'web',
    },
    {
      id: '2',
      image: '/images/banners/mobile-foqueemseunegocio.jpg',
      title: 'Foque em seu negócio',
      url: '#',
      status: true,
      targetDevice: 'mobile',
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [editingBanner, setEditingBanner] = React.useState<Banner | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false)
  const [bannerToDelete, setBannerToDelete] = React.useState<string | null>(
    null
  )
  const [tempBanner, setTempBanner] = React.useState<Banner>({
    id: '',
    image: '',
    title: '',
    url: '',
    status: true,
    targetDevice: 'web',
  })
  const [previewImage, setPreviewImage] = React.useState<string | null>(null)
  const [selectedDevices, setSelectedDevices] = React.useState<
    ('web' | 'mobile')[]
  >(['web'])
  const canAddMoreBanners = banners.length < 10

  const filteredBanners = banners.filter((banner) =>
    selectedDevices.includes(banner.targetDevice)
  )

  function openBannerDialogForCreate() {
    setEditingBanner(null)
    setTempBanner({
      id: '',
      image: '',
      title: '',
      url: '',
      status: true,
      targetDevice: 'web',
    })
    setPreviewImage(null)
    setIsDialogOpen(true)
  }

  function closeDialog() {
    setIsDialogOpen(false)
    setEditingBanner(null)
    setTempBanner({
      id: '',
      image: '',
      title: '',
      url: '',
      status: true,
      targetDevice: 'web',
    })
    setPreviewImage(null)
  }

  function handleConfirmBanner() {
    if (!tempBanner.image) {
      alert('Por favor, faça upload de uma imagem antes de confirmar.')
      return
    }

    if (editingBanner) {
      setBanners((prev) =>
        prev.map((banner) =>
          banner.id === editingBanner.id ? { ...tempBanner } : banner
        )
      )
    } else {
      setBanners((prev) => [
        ...prev,
        { ...tempBanner, id: `banner-${Date.now()}` },
      ])
    }
    closeDialog()
  }

  function handleEditBanner(banner: Banner) {
    setEditingBanner(banner)
    setTempBanner(banner)
    setPreviewImage(banner.image)
    setIsDialogOpen(true)
  }

  function handleDeleteBanner(id: string) {
    setBannerToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  function confirmDeleteBanner() {
    if (!bannerToDelete) return
    setBanners((prev) => prev.filter((banner) => banner.id !== bannerToDelete))
    setIsDeleteDialogOpen(false)
    setBannerToDelete(null)
  }

  function handleToggleStatus(id: string) {
    setBanners((prev) =>
      prev.map((banner) =>
        banner.id === id ? { ...banner, status: !banner.status } : banner
      )
    )
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      setBanners((prev) => {
        const oldIndex = prev.findIndex((banner) => banner.id === active.id)
        const newIndex = prev.findIndex((banner) => banner.id === over.id)
        return arrayMove(prev, oldIndex, newIndex)
      })
    }
  }

  const handleSave = () => {
    // Verificar se há banners inválidos
    const invalidBanners = banners.filter(
      (banner) => !banner.image || !banner.title || !banner.url
    )

    if (invalidBanners.length > 0) {
      toast({
        title: 'Erro ao salvar!',
        description: 'Alguns banners possuem campos incompletos.',
        variant: 'danger',
      })
      return
    }

    try {
      // Simular envio para API/externo
      console.log('Dados salvos:', banners)

      toast({
        title: 'Salvo com sucesso!',
        description: 'A configuração dos banners foi atualizada.',
        variant: 'success',
      })
    } catch {
      toast({
        title: 'Erro ao salvar!',
        description: 'Ocorreu um erro ao tentar salvar as configurações.',
        variant: 'danger',
      })
    }
  }

  return (
    <div className="p-0">
      <Card className="border-0 shadow-none">
        <CardHeader className="flex justify-between items-center p-4">
          <div className="flex items-center justify-between w-full gap-4">
            <div className="flex-1 max-w-xs">
              <FilterSelect
                items={[
                  { label: 'Web', value: 'web' },
                  { label: 'Mobile', value: 'mobile' },
                ]}
                multiple={true}
                initialValues={selectedDevices}
                onSave={(selected) =>
                  setSelectedDevices(selected as ('web' | 'mobile')[])
                }
                onCancel={() => {}}
                placeholder="Dispositivos"
              />
            </div>
            <Button
              onClick={openBannerDialogForCreate}
              className="bg-primary px-5 py-3 text-white hover:text-white hover:bg-primary-800"
              disabled={!canAddMoreBanners}
            >
              Adicionar
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          {filteredBanners.length === 0 ? (
            <>
              <div className="relative w-[250px] h-[250px] mx-auto m-0">
                <Image
                  src="/images/dashboard/empyt_state/empy_state_slider.webp"
                  alt="Nenhuma imagem cadastrada"
                  fill
                  quality={100} // Garante a qualidade máxima da renderização
                  className="object-contain"
                />
              </div>

              <p className="text-gray-500 text-center pb-5 m-0">
                Nenhuma imagem adicionada ao slider até o momento.
              </p>
            </>
          ) : (
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={filteredBanners.map((banner) => banner.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredBanners.map((banner) => (
                    <SortableBanner
                      key={banner.id}
                      banner={banner}
                      onEdit={handleEditBanner}
                      onDelete={handleDeleteBanner}
                      onToggleStatus={handleToggleStatus}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}

          {/* Botão Salvar */}
          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Salvar
            </Button>
          </div>
        </CardContent>
      </Card>

      {isDialogOpen && (
        <Modal
          open={isDialogOpen}
          onOpenChange={closeDialog}
          title={editingBanner ? 'Editando Slider' : 'Adicionando Slider'}
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="image" className="required">
                Imagem
              </Label>
              {previewImage && (
                <Image
                  src={previewImage}
                  alt="Preview"
                  width={500}
                  height={200}
                  className="w-full h-40 object-cover rounded-lg mb-2"
                />
              )}
              <FileUpload
                multiple={false}
                maxFiles={1}
                allowedFormats={['image/jpeg', 'image/png', 'image/webp']}
                onUpload={(files) => {
                  const file = files[0]
                  if (file) {
                    const imageUrl = URL.createObjectURL(file)
                    setTempBanner((prev) => ({
                      ...prev,
                      image: imageUrl,
                    }))
                    setPreviewImage(imageUrl)
                  }
                }}
                onRemove={() => {
                  setTempBanner((prev) => ({ ...prev, image: '' }))
                  setPreviewImage(null)
                }}
                defaultFiles={
                  editingBanner?.image
                    ? [
                        {
                          ...new File([], 'Imagem Atual'), // Simula um arquivo
                          path: editingBanner.image,
                          name: 'Imagem Atual',
                          size: 1024, // Você pode ajustar para o tamanho real, se necessário
                          type: 'image/jpeg', // Defina o tipo correto de arquivo
                        },
                      ]
                    : []
                }
              />
            </div>
            <div>
              <Label htmlFor="title" className="required">
                Título
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="Título do banner"
                value={tempBanner.title}
                onChange={(e) =>
                  setTempBanner((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="url" className="required">
                URL
              </Label>
              <Input
                id="url"
                type="text"
                placeholder="URL do banner"
                value={tempBanner.url}
                onChange={(e) =>
                  setTempBanner((prev) => ({
                    ...prev,
                    url: e.target.value,
                  }))
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="targetDevice" className="required">
                Dispositivo
              </Label>
              <select
                id="targetDevice"
                value={tempBanner.targetDevice}
                onChange={(e) =>
                  setTempBanner((prev) => ({
                    ...prev,
                    targetDevice: e.target.value as 'web' | 'mobile',
                  }))
                }
                className="w-full border rounded-md p-2"
              >
                <option value="web">Web</option>
                <option value="mobile">Mobile</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                className="py-2 px-4 bg-neutral-50 text-neutral hover:text-white hover:bg-neutral-400"
                onClick={closeDialog}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleConfirmBanner}
                className={`py-2 px-4 transition-all ${
                  !tempBanner.image || !tempBanner.title || !tempBanner.url
                    ? 'bg-primary-200 text-white cursor-not-allowed'
                    : 'bg-primary text-white hover:bg-primary-800'
                }`}
                disabled={
                  !tempBanner.image || !tempBanner.title || !tempBanner.url
                }
              >
                Confirmar
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {isDeleteDialogOpen && (
        <Modal
          open={isDeleteDialogOpen}
          onOpenChange={() => setIsDeleteDialogOpen(false)}
          title="Deletar slider"
        >
          <p className="text-neutral-400">
            Tem certeza de que deseja deletar este slider?
          </p>
          <div className="flex justify-end space-x-2 mt-4">
            <Button
              variant="secondary"
              className="py-2 px-4 bg-neutral-50 text-neutral"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              className="py-2 px-4 transition-all bg-secondary text-white hover:bg-secondary-800"
              onClick={confirmDeleteBanner}
            >
              Deletar
            </Button>
          </div>
        </Modal>
      )}
    </div>
  )
}
