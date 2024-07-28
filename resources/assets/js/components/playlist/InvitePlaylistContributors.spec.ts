import { expect, it } from 'vitest'
import { screen, waitFor } from '@testing-library/vue'
import UnitTestCase from '@/__tests__/UnitTestCase'
import factory from '@/__tests__/factory'
import { playlistCollaborationService } from '@/services'
import Component from './InvitePlaylistCollaborators.vue'

new class extends UnitTestCase {
  protected test () {
    it('works', async () => {
      this.mock(playlistCollaborationService, 'createInviteLink').mockResolvedValue('http://localhost:3000/invite/1234')
      const writeTextMock = this.mock(navigator.clipboard, 'writeText')
      const playlist = factory('playlist')

      this.render(Component, {
        props: {
          playlist
        }
      })

      await this.user.click(screen.getByText('Invite'))

      await waitFor(async () => {
        expect(writeTextMock).toHaveBeenCalledWith('http://localhost:3000/invite/1234')
        screen.getByText('Link copied to clipboard!')
      })
    })
  }
}
