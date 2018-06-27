export default class Collision {
  detectRangeOverlapping (minA, maxA, minB, maxB) {
    return Math.max(minA, maxA) >= Math.min(minB, maxB) && Math.min(minA, maxA) <= Math.max(minB, maxB)
  }

  areTheyIntersecting (objectA = {}, objectB = {}) {
    return this.detectRangeOverlapping(objectA.left, objectA.right, objectB.left, objectB.right) && this.detectRangeOverlapping(objectA.top, objectA.bottom, objectB.top, objectB.bottom)
  }

  detect (collider = {}, collided = {}) {
    if (this.areTheyIntersecting(collider, collided)) {
      console.log('intersecting!!')
    }
  }
}
