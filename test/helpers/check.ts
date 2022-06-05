type ResBody = {
  success: boolean,
  data: unknown
}

export const checkSuccessBody = (body: unknown) => {
  expect(typeof body).toBe('object')
  expect(body).toHaveProperty('success')
  expect(body).toHaveProperty('data')
  expect((body as ResBody).success).toBe(true)
}